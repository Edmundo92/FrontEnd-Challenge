export function listItems(items: [], currentPage: number, limitItems: number) {
  let result: [] = [];
  let tPage = totalPage(items, limitItems);
  let count = currentPage * limitItems - limitItems;
  let delimiter = count + limitItems;

  if (currentPage <= tPage) {
    for (let i = count; i < delimiter; i++) {
      let item = items[i];

      if (item != null) {
        result.push(item);
      }

      count++;
    }
  }
  return result;
}

export function totalPage(items: [], limitItems: number) {
  return Math.ceil(items.length / limitItems);
}

export function pageItems(items: [], limitItems: number) {
  let size = totalPage(items, limitItems);
  let f = [];

  for (let i = 1; i <= size; i++) {
    f.push(i);
  }

  return f;
}
