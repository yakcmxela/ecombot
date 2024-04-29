"use server";

import ogs from "open-graph-scraper";

export const getOGData = async (url: string) => {
  try {
    const { result } = await ogs({ url });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
