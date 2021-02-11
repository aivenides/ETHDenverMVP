import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import InfoCard from "./components/InfoCard";
import PictureFame from "./components/PictureFame";
import { GET_TOKEN_VIEW } from "./queries";

export default function View() {
  const [mst, setMst] = useState(null);
  const { url } = useRouteMatch();
  const { data } = useQuery(GET_TOKEN_VIEW, {
    variables: { id: url.substring(6) },
  });

  useEffect(() => {
    if (data) {
      axios
        .get(
          process.env.REACT_APP_BUCKET_URL + data?.mst?.uri + "_metadata.json"
        )
        .then((res) => {
          setMst(res.data);
        });
    }
  }, [data]);

  console.log(url.substring(6));

  console.log(data);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Masterfile | X by Artist</title>
      </Helmet>
      <div class="py-10">
        <Header title={mst?.name} />
      </div>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="px-4 py-8 sm:px-0">
            <InfoCard mst={mst} purchasePrice={data?.mst?.salePrice} />
            <PictureFame />
          </div>
        </div>
      </main>
    </>
  );
}
