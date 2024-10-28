"use client"

import React, { useEffect, useState } from "react";
import Heading from "@/components/global/Heading";
import MovieCard from "@/components/movies/MovieCard";
import WaveImg from "/public/images/bottomVector.png";
import Image from "next/image";
import MoviceImageOne from "/public/images/card2.jpeg";
import MoviceImageTwo from "/public/images/card1.jpeg";
import MovieImageThree from "/public/images/card3.jpeg";
import LogoutIcon from "@/components/svgIcons/LogoutIcon";
import AddMovieIcon from "@/components/svgIcons/AddMovieIcon";
import Link from "next/link";
import axios from "axios";
import { axiosInstance } from "@/utils/apiconfig";

const movieCard = [
  {
    id: 1,
    title: "Movie 1",
    releaseYear: 2021,
    imageSrc: MoviceImageOne.src,
    alt: "movie-action",
  },
  {
    id: 2,
    title: "Movie 1",
    releaseYear: 2021,
    imageSrc: MoviceImageTwo.src,
    alt: "movie-action",
  },
  {
    id: 3,
    title: "Movie 1",
    releaseYear: 2021,
    imageSrc: MoviceImageTwo.src,
    alt: "movie-action",
  },
  {
    id: 4,
    title: "Movie 1",
    releaseYear: 2021,
    imageSrc: MovieImageThree.src,
    alt: "movie-action",
  },
  {
    id: 5,
    title: "Movie 1",
    releaseYear: 2021,
    imageSrc: MoviceImageOne.src,
    alt: "movie-action",
  },
  {
    id: 6,
    title: "Movie 1",
    releaseYear: 2021,
    imageSrc: MoviceImageTwo.src,
    alt: "movie-action",
  },
  {
    id: 7,
    title: "Movie 1",
    releaseYear: 2021,
    imageSrc: MoviceImageTwo.src,
    alt: "movie-action",
  },
  {
    id: 8,
    title: "Movie 1",
    releaseYear: 2021,
    imageSrc: MovieImageThree.src,
    alt: "movie-action",
  },
];

export default function page() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchMovies()
  }, [])

const fetchMovies = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("No access token found");
    return; 
  }

  try {
    const response = await axiosInstance.get("/api/v1/authentication/movies/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data, "dkfjdkfjdkjfkdjflfk");

    if (response.status === 200) {
      console.log("Movies fetched successfully:", response);
      setData(response.data);
    } else {
      // Handle HTTP response statuses
      if (response.status === 401) {
        console.error("Unauthorized access. Please check your credentials.");
      } else if (response.status === 403) {
        console.error("Access forbidden. You do not have permission.");
      } else if (response.status === 500) {
        console.error("Server error. Please try again later.");
      } else {
        console.error("An error occurred:", response.statusText);
      }
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};


const handleLogout = () => {
  localStorage.removeItem("accessToken");
  window.location.href = "/signin";
}

  return (
    <div>
      <div className="mx-auto md:max-w-screen-2xl md:px-6 px-4 md:my-24 my-12 ">
        <div className="mt-12 flex justify-between items-center">
          <div className="flex justify-center items-center gap-4">
            <Heading>My movies</Heading>
            <Link href="add-new-movie">
            <AddMovieIcon />
            </Link>
          </div>
          <div className="flex justify-center items-center gap-4">
            <h2 className=" text-white font-bold ">
              Logout
            </h2>
            <div onClick={handleLogout} className="cursor-pointer">
            <LogoutIcon />
            </div>
          </div>
        </div>
        <div className="md:my-24 my-12 grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-4">
          {data.length > 0 && data.map((item, index) => (
            <MovieCard
              imageSrc={item.image}
              alt={item.title}
              title={item.title}
              releaseYear={item.releaseYear}
              key={index}
            />
          ))}
        </div>
        <div className="flex justify-center items-center gap-2 md:pt-10 pt-8">
          {/* <h2 className="text-white">Prev</h2>

          <h2>Next</h2> */}

          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 ms-0 text-white text-base font-bold "
                >
                  Prev
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2  ml-2 mr-3 rounded-md text-white bg-[var(--color-primary)] font-bold text-base"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 mr-2 rounded-md text-white bg-[var(--color-card-color)] font-bold text-base"
                >
                  2
                </a>
              </li>
              <li>
              <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 ms-0 text-white text-base font-bold "
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div>
        <Image src={WaveImg} alt="vector-bottom-wave" className="w-full " />
      </div>
    </div>
  );
}
