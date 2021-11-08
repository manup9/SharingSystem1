export default function (customerlist, filter, filterBy) {
    if (!customerlist) return null;
    if (
      !filter ||
      !filterBy ||
      !filter.trim()
    )
      return customerlist;
    return customerlist.filter((element) =>
      element[filterBy]
        .toString()
        .toLowerCase()
        .startsWith(filter.toString().toLowerCase())
    );
  }