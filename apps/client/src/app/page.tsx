'use client'

import { listPrayers } from "@providers/api/prayers";
import { Prayer } from "api";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);

  useEffect(() => {
    listPrayers().then((response) => setPrayers(response.data.list));
  });

  return <div></div>;
}
