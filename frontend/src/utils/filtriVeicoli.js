export default function (listaveicoli, filter, filterBy) {
    if (!listaveicoli) return null;
    if (
      !filter ||
      !filterBy ||
      !filter.trim()
    )
      return listaveicoli;
    return listaveicoli.filter((element) =>
      element[filterBy]
        .toString()
        .toLowerCase()
        .startsWith(filter.toString().toLowerCase())
    );
  }