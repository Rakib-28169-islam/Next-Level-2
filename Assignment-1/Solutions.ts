function formatString(input: string, toUpper?: boolean): string {
    switch (toUpper) {
      case true:
        return input.toUpperCase();
      case false:
        return input.toLowerCase();
      default:
        return input.toUpperCase();
    }
  }
  
  function filterByRating(
    items: { title: string; rating: number }[]
  ): { title: string; rating: number }[] {
    return items.filter((item) => item.rating >= 4.0);
  }
  
  function concatenateArrays<T>(...arrays: T[][]): T[] {
    let result: T[] = [];
    arrays.forEach((cellArray) => {
      result = [...result, ...cellArray];
    });
    return result;
  }
  
  class Vehicle {
    constructor(private _make: string, private _year: number) {}
    public getInfo(): void {
      console.log(`Make: ${this._make}, Year: ${this._year}`);
    }
  }
  class Car extends Vehicle {
    constructor(make: string, year: number, private _model: string) {
      super(make, year);
    }
    public getModel(): void {
      console.log(`Model: ${this._model}`);
    }
  }
  
  function processValue(value: string | number): number {
    return typeof value === "string" ? value.length : value * 2;
  }
  
  interface Product {
    name: string;
    price: number;
  }
  
  function getMostExpensiveProduct(products: Product[]): Product | null {
    if (products.length === 0) {
      return null;
    }
    return products.reduce((maxProduct: Product, product: Product) => {
      return product.price > maxProduct.price ? product : maxProduct;
    }, products[0]);
  }
  
  enum Day {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }
  
  function getDayType(day: Day): string {
    return day === Day.Saturday || day === Day.Sunday ? "Weekend" : "Weekday";
  }
  
  async function squareAsync(n: number): Promise<number> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        n >= 0
          ? resolve(n * n)
          : reject(new Error("Negative number not allowed"));
      }, 1000);
    });
  }
  