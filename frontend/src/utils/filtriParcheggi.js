export default function (listaparcheggi, filter, filterBy) {
  if (!listaparcheggi) return null;
  if (!filter || !filterBy || !filter.trim()) return listaparcheggi;
  return listaparcheggi.filter((element) =>
    element[filterBy]
      .toString()
      .toLowerCase()
      .startsWith(filter.toString().toLowerCase())
  );
}
