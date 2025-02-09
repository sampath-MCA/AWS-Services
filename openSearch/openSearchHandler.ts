

import { esSearch } from './openSearch';
export const getData = async (event) => {
      return await esSearch.getFromElasticSearch();
    }


