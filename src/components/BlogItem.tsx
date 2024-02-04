import { removeNode } from "@/firebase";
import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { BlogSize } from "@/app/types/types";

const Wrapper = styled.a`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  border-radius: 3px;
  border: 0 solid #69727d;
  transition: all 0.25s;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  text-decoration: none;
  color: var(--dark-grey-3);

  &:hover,
  &:active {
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div<{ $imgSrc: string; $blogHeight: number }>`
  ${({ $imgSrc }) => `background-image: url(${$imgSrc})`};
  height: ${({ $blogHeight }) => `${$blogHeight}rem`};
  width: 100%;
  background-size: cover;
`;

const InfoContainer = styled.div<{ $blogSize: BlogSize }>`
  ${({ $blogSize }) => $blogSize === BlogSize.MEDIUM && "padding: 2rem 3rem;"}
  ${({ $blogSize }) => $blogSize === BlogSize.SMALL && "padding: 1rem 2rem;"}
  ${({ $blogSize }) =>
    $blogSize === BlogSize.XS && "padding: 1rem 1rem 0 1rem;"}

  @media only screen and (max-width: 600px) {
    & {
      ${({ $blogSize }) =>
        $blogSize === BlogSize.MEDIUM && "padding: 1rem 1rem;"}
      ${({ $blogSize }) =>
        $blogSize === BlogSize.SMALL && "padding: 1rem 1rem;"}
      ${({ $blogSize }) =>
        $blogSize === BlogSize.XS && "padding: 1rem 1rem 0 1rem;"}
    }
  }
`;

const Title = styled.span<{ $blogSize: BlogSize }>`
  color: var(--dark-grey-3);
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0;

  @media only screen and (max-width: 600px) {
    & {
      ${({ $blogSize }) => $blogSize === BlogSize.MEDIUM && "font-size: 1rem;"}
      ${({ $blogSize }) => $blogSize === BlogSize.SMALL && "font-size: 0.8rem;"}
      ${({ $blogSize }) => $blogSize === BlogSize.XS && "font-size: 0.6rem;"}
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  padding: 1rem;
`;

const Edit = styled.a`
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 1rem;
  background-color: #1a2c55;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  margin-right: 1rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Delete = styled.button`
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 1rem;
  background-color: #551a1a;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  flex: 1;
`;

export const BlogItem = ({
  id,
  imgSrc,
  title,
  size,
  withAction = false,
  onDelete,
}: {
  id: string;
  imgSrc: string;
  title: string;
  size: BlogSize;
  withAction?: boolean;
  onDelete?: () => void;
}) => {
  const blogImageHeight = () => {
    const screenWidth = window.innerWidth;
    if (size === BlogSize.MEDIUM) {
      if (screenWidth <= 600) {
        return 9.0625;
      }
      return 22.0625;
    }
    if (size === BlogSize.SMALL) {
      if (screenWidth <= 600) {
        return 5.625;
      }
      return 10.625;
    }
    if (size === BlogSize.XS) {
      if (screenWidth <= 600) {
        return 4.625;
      }
      return 8.625;
    }
    return 10.625;
  };

  const blogImageHeightVal = blogImageHeight();
  return (
    <Wrapper href={`/blog/${id}`}>
      <ImageWrapper
        aria-label={title}
        $imgSrc={imgSrc}
        $blogHeight={blogImageHeightVal}
      />
      <InfoContainer $blogSize={size}>
        <Title $blogSize={size}>{title}</Title>
      </InfoContainer>
      {withAction && (
        <ButtonContainer>
          <Edit href={`/admin/edit-blog/${id}`}>Edit</Edit>
          <Delete
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
          </Delete>
        </ButtonContainer>
      )}
    </Wrapper>
  );
};
