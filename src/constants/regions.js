export const regions = [
    {
      id: 0,
      name: "Romania",
      locale: "ro",
    },
    {
      id: 1,
      name: "Poland",
      locale: "pl",
    },
    {
      id: 2,
      name: "UK",
      locale: "en",
    },
  ];
  export const regionOptions = regions.map((r) => ({
      label: r.name,
      value: r.locale,
    }));