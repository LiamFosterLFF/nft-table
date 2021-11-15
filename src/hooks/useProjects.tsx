import React from "react";

export const useProjects = () => {
  const [projects, setProjects] = React.useState([]);
  const [APIPageNo, setAPIPageNo] = React.useState(1);
  const [tablePageNo, setTablePageNo] = React.useState(0);
  const [filterValue, setFilterValue] = React.useState("All Time");
  const [originalProjects, setOriginalProjects] = React.useState([]);

  const fetchData = async (page) => {
    const url = "https://api.cnft.io/market/listings";
    const body = {
      nsfw: "false",
      page: `${page}`,
      priceMax: null,
      priceMin: null,
      project: null,
      search: "",
      sold: false,
      sort: { _id: -1 },
      types: ["listing", "auction", "offer"],
      verified: true,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    const projectArr = await data.results.map((proj, ind) => {
      const imageUrl =
        proj.asset.metadata.image &&
        proj.asset.metadata.image.slice(0, 7) === "ipfs://"
          ? proj.asset.metadata.image.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            )
          : "";

      return {
        projectName: proj.asset.metadata.name,
        index: projects.length + ind + 1,
        imageUrl: imageUrl,
        updatedAt: proj.updatedAt,
        createdAt: proj.createdAt,
        volume: (Math.random() * 1000).toFixed(2),
        twentyFourHour: (Math.random() * 200 - 100).toFixed(2),
        sevenDay: (Math.random() * 200 - 100).toFixed(2),
        floorPrice: (Math.random() * 100).toFixed(2),
      };
    });
    return projectArr;
  };

  const getData = (pageNo) => {
    fetchData(pageNo).then((newData) => {
      const newProjects = [...projects, ...newData];
      setProjects(newProjects);
      setOriginalProjects(newProjects);
    });
  };

  const getNextPage = (currentTablePageNo) => {
    setTablePageNo(currentTablePageNo);
    const nextPage = APIPageNo + 1;
    setAPIPageNo(nextPage);
    getData(nextPage);
  };

  const setFilter = (value) => {
    setFilterValue(value);
    setProjects(
      originalProjects.filter((project) => {
        const ageInSeconds =
          new Date().getTime() - new Date(project.createdAt).getTime();

        switch (value) {
          case "Last 30 seconds":
            return ageInSeconds < 30;
          case "Last 24hr":
            return ageInSeconds < 24 * 60 * 60;
          case "7 Days":
            return ageInSeconds < 24 * 60 * 60 * 7;
          case "1 Month":
            return ageInSeconds < 24 * 60 * 60 * 30;
          default:
            return true;
        }
      })
    );
  };

  return [
    projects,
    originalProjects,
    setProjects,
    getNextPage,
    tablePageNo,
    filterValue,
    setFilter,
  ] as const;
};
