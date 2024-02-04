"use client";

import React from "react";
import { ComputerIcon } from "@/Icon/ComputerIcon";
import { toast } from "react-toastify";
import { removeNode } from "@/firebase";
import { ServiceItemTypes } from "@/app/types/types";

import "./ServiceItem.scss";

export const ServiceItem = ({
  id,
  imgSrc,
  title,
  body,
  type,
  withAction = false,
  onDelete,
}: {
  id: string;
  imgSrc: string;
  title: string;
  body: string;
  withAction?: boolean;
  onDelete?: () => void;
  type: ServiceItemTypes;
}) => {
  switch (type) {
    case ServiceItemTypes.typeOne:
      return (
        <div className="service-item service-item__one">
          <div className="service-item__info">
            <img className="service-item__image" src={imgSrc} alt={title} />
            <h3 className="service-item__header">{title}</h3>
            <p className="service-item__body">{body}</p>
          </div>
        </div>
      );
    case ServiceItemTypes.typeTwo:
      return (
        <div className="service-item service-item__two">
          <div className="service-item__info">
            <div className="service-item__icon-container">
              <ComputerIcon />
            </div>
            <h3 className="service-item__header service-item__header--two">
              {title}
            </h3>
            <p className="service-item__body service-item__body--two">{body}</p>
          </div>
          <a href={`/service/${id}`} className="service-item__button">
            view more
          </a>
        </div>
      );
    case ServiceItemTypes.typeThree:
      return (
        <div className="service-item__type-three-item">
          <div>
            <span className="service-item__type-three-header">{title}</span>
          </div>
          <a href={`/service/${id}`} className="service-item__link">
            visit
          </a>
          {withAction && (
            <div className="service-item__button-container">
              <a href={`/admin/edit-blog/${id}`} className="service-item__edit">
                Edit
              </a>
              <button
                className="service-item__delete"
                onClick={(e) => {
                  e.preventDefault();
                  toast("Deleting...");
                  removeNode({
                    refPath: `/blogs/${id}`,
                    onSuccess: () => {
                      toast("Blog Deleted");
                    },
                    onError: () => {
                      toast("Failed", { type: "error" });
                    },
                  });
                  onDelete && onDelete();
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      );
  }
};
