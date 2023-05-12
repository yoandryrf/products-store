import { getAllData } from "@/data/data";
import { useEffect, useState } from "react";
import Select from "@/components/Select";
import { Chart } from "@/components/Chart";

function FiltersContainer() {
  const [initialData, setInitialData] = useState([]);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  const [categorySelected, setCategorySelected] = useState(null);
  const [productSelected, setProductSelected] = useState(null);
  const [brandSelected, setBrandSelected] = useState(null);

  const handleChangeCategory = (e) => {
    const id = parseInt(e.target.value);
    const category = categories.find((item) => item.id === id);
    setCategorySelected(category);
    setProductSelected(null);
    setBrandSelected(null);
  };

  const handleChangeProduct = (e) => {
    const product = products.find(
      (item) => item.id === parseInt(e.target.value)
    );
    setProductSelected(product);
    setBrandSelected(null);
  };

  const handleChangeBrand = (e) => {
    const brand = brands.find((item) => item.id === parseInt(e.target.value));
    setBrandSelected(brand);
    setProductSelected(null);
  };

  const filteredList = categorySelected
    ? initialData.filter((item) => {
        if (productSelected) {
          return item.product.id === productSelected.id;
        }
        if (brandSelected) {
          return (
            item.product.brand.category_id === categorySelected.id &&
            item.product.brand.id === brandSelected.id
          );
        }
        return item.product.brand.category_id === categorySelected.id;
      })
    : initialData;

  const filteredProducts = categorySelected
    ? products.filter((item) => {
        return item.brand.category_id === categorySelected.id;
      })
    : products;

  const filteredBrands = categorySelected
    ? brands.filter((item) => {
        if (categorySelected) {
          return item.id === categorySelected.id;
        }
      })
    : brands;

  useEffect(() => {
    const data = getAllData();
    setInitialData(data.sales);
    setCategories(data.categories);
    setProducts(data.products);
    setBrands(data.brands);
  }, []);

  return (
    <main className="m-20">
      <div className="flex gap-5 md:items-center md:flex-row md:justify-between flex-col m-5">
        <Select
          options={categories}
          label={"Category"}
          selectedItem={categorySelected}
          onChange={handleChangeCategory}
        ></Select>
        <Select
          options={filteredProducts}
          label={"Product"}
          selectedItem={productSelected}
          disabled={categorySelected == null || !filteredProducts.length}
          onChange={handleChangeProduct}
        ></Select>
        <Select
          options={filteredBrands}
          label={"Brand"}
          selectedItem={brandSelected}
          disabled={categorySelected == null || !filteredBrands.length}
          onChange={handleChangeBrand}
        ></Select>
        <button
          type="button"
          onClick={() => {
            setCategorySelected(null);
            setProductSelected(null);
            setBrandSelected(null);
          }}
          className="self-end px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Reset
        </button>
      </div>
      <div style={{ maxHeight: "50%" }}>
        {categorySelected && (
          <Chart
            arr={filteredList}
            filters={`( ${categorySelected ? categorySelected.name : ""} ${
              productSelected ? "," + productSelected.name : ""
            } ${brandSelected ? "," + brandSelected.name : ""})`}
          />
        )}

        {!categorySelected && (
          <div className="flex flex-col gap-10 items-center sm:py-28">
            <p className="font-semibold text-2xl text-gray-500">
              Select any filter
            </p>
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
      </div>
    </main>
  );
}

export default FiltersContainer;
