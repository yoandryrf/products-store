import { faker } from "@faker-js/faker";

const CATEGORIES_COUNT = 10;
const PRODUCTS_COUNT = 50;

export function getAllData() {
  const categories = getCategories();
  const brands = getBrands();
  const products = getProducts(brands);
  const sales = getSalesData(products);
  return { sales, categories, products, brands };
}

export function getSalesData(products) {
  const data = [];
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Generate sales data for each product
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const sales = [];

    // Generate sales data for each month
    for (let month = 0; month <= currentMonth; month++) {
      const quantity = faker.string.numeric({ min: 10, max: 100 });
      const price = faker.commerce.price({ min: 10, max: 100, dec: 2 });
      const revenue = quantity * price;
      const date = new Date(currentYear, month, 1);
      const monthName = date.toLocaleString("default", { month: "long" });

      sales.push({
        month: monthName,
        quantity: quantity,
        price: price,
        revenue: revenue.toFixed(2),
      });
    }

    data.push({
      product: product,
      sales: sales,
    });
  }

  return data;
}

export function getProducts(brands) {
  let products = [];
  const { length } = brands;

  for (let i = 0; i < PRODUCTS_COUNT; i++) {
    const brand = brands[faker.string.numeric({ min: 0, max: length })];
    const product = {
      id: i + 1,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      brand: brand,
    };
    products.push(product);
  }

  return products;
}

export function getCategories() {
  let departments = [];
  for (let i = 0; i < CATEGORIES_COUNT; i++) {
    const name = faker.commerce.department();
    departments.push({ id: i + 1, name: name });
  }
  return departments.filter(
    (item, index, self) => index === self.findIndex((p) => p.name === item.name)
  );
}

export function getBrands() {
  const count = 100;
  let brands = [];
  for (let i = 0; i < count; i++) {
    const name = faker.company.name();
    brands.push({
      id: i + 1,
      name: name,
      category_id: parseInt(
        faker.string.numeric({ min: 1, max: CATEGORIES_COUNT })
      ),
    });
  }

  return brands.filter(
    (item, index, self) => index === self.findIndex((p) => p.name === item.name)
  );
}
