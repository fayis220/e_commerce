import themeConfig from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

export default function ShopSideBar({ data }) {
  const updateURL = (color) => {
    const url = new URL(window.location);

    // Get selected colors from URL and split into an array
    const selectedColors = url.searchParams.get("colors")
      ? url.searchParams.get("colors").split("-")
      : [];

    // Toggle the selected color
    if (selectedColors.includes(color)) {
      // If the color is already selected, remove it
      selectedColors.splice(selectedColors.indexOf(color), 1);
    } else {
      // If the color is not selected, add it
      selectedColors.push(color);
    }

    // Update the colors in the URL
    if (selectedColors.length > 0) {
      url.searchParams.set("colors", selectedColors.join("-")); // Use '-' to join colors
    } else {
      url.searchParams.delete("colors"); // Remove the colors parameter if no colors are selected
    }

    const selectedSizes = url.searchParams.get("sizes")
      ? url.searchParams.get("sizes").split("-")
      : [];

    // Update the URL without reloading the page
    window.history.replaceState({}, "", url);
  };

  const handleChange = (color) => {
    updateURL(color);
  };

  useEffect(() => {
    // Optionally, parse the URL on load to set the initial state if needed
    const url = new URL(window.location);
    const selectedColors = url.searchParams.get("colors")
      ? url.searchParams.get("colors").split("-")
      : [];

    // Set the checkboxes based on URL
    selectedColors.forEach((color) => {
      const checkbox = document.getElementById(color);
      if (checkbox) {
        checkbox.checked = true;
      }
    });
  }, []);
  return (
    <>
      {data ? (
        <div className="col-12 col-md-4 col-lg-3">
          <div className="shop-product-left">
            <div className="product-categories">
              <h4 className="shop-product-title">{data.categoty_title}ss</h4>
              <ul>
                {data.category_list && data.category_list.length > 0
                  ? data.category_list.map((category_data, index) => (
                      <li key={index}>
                        <Link href={`/category/${category_data.slug}`}>
                          {category_data.title}
                        </Link>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            {/* <div className="filter-by">
              <h4 className="shop-product-title">{data.filter_title}</h4>
              <div className="filter-color-wrap">
                {data.color_list && data.color_list.length > 0
                  ? data.color_list.map((color_data, index) => (
                      <div className="filter-color-futures" key={index}>
                        <input
                          type="checkbox"
                          id={color_data.title}
                          onChange={() => handleChange(color_data.title)}
                        />
                        <label
                          className={color_data.class}
                          htmlFor={color_data.title}
                        >
                          {color_data.title}
                        </label>
                        <h6>{color_data.number}</h6>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="instagram">
              <h4 className="shop-product-title">{data.insta_title}</h4>
              <div className="instagram-wrap">
                {data.post_list && data.post_list.length > 0
                  ? data.post_list.map((post_data, index) => (
                      <div className="instagram-img" key={index}>
                        <Link href="" className="img-cover">
                          <Image
                            src={
                              post_data.image
                                ? post_data.image
                                : themeConfig.no_found_image
                            }
                            width={post_data.width}
                            height={post_data.height}
                            alt=""
                          />
                        </Link>
                      </div>
                    ))
                  : null}
              </div>
            </div> */}
          </div>
        </div>
      ) : null}
    </>
  );
}
