"use client";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { pushData } from "@/firebase";
import { AdminHeader, AdminNav, AdminWrapper } from "../components/AdminNav";
import { AdminRadio } from "../components/AdminRadio";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useGetData } from "@/firebase/useFetch";
import {
  ImageInput,
  TextArea,
  TextInput,
  onInputChange,
} from "../components/Fields/Fields";
import { ResetButton, SaveButton } from "../StyledComponent";
import { Services } from "@/components/Services/Services";
import { ServiceItemTypes } from "@/app/types/types";

interface SectionProps {
  index: number;
  number: number;
  dataObject: {
    title: string;
    imgSrc: string;
    body: string;
  };
  onDeleteSection: (index: number) => void;
  onUpdateSection: (index: number, newData: any) => void;
}

interface SectionData {
  title: string;
  imgSrc: string;
  body: string;
}

enum ServiceType {
  TYPE_ONE = "Type One",
  TYPE_TWO = "Type Two",
}

type ServiceData = {
  title: string;
  subtitle: string;
  description: string;
  imgSrc: string;
  type: ServiceType;
  sections: SectionData[];
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Label = styled.label`
  font-weight: 500;
  margin: 0.5rem 0;
`;

const AdminSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const AdminSectionHeader = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  display: inline-block;
`;

const StyledAddService = styled(SaveButton)`
  margin-top: 2rem;
  background-color: #257a9c;
  width: 10rem;
  color: #fff;
  box-shadow: rgba(37, 122, 156, 0.2) 0px 4px 10px 0px;

  &:hover {
    background-color: #288fb8;
  }
`;
const StyledResetButton = styled(ResetButton)`
  margin: 2rem 0;
  width: 12rem;
  color: #fff;
`;

const StyledSaveButton = styled(SaveButton)`
  margin-top: 2rem;
  width: 10rem;
`;

const Section: React.FC<SectionProps> = ({
  index,
  number,
  dataObject,
  onDeleteSection,
  onUpdateSection,
}) => {
  const handleInputChange = (field: keyof SectionData, value: string) => {
    const updatedData: SectionData = {
      ...dataObject,
      [field]: value,
    };
    onUpdateSection(index, updatedData);
  };

  return (
    <AdminSection>
      <AdminSectionHeader>Section {number}</AdminSectionHeader>

      <TextInput
        value={dataObject.title}
        onChange={(e) => handleInputChange("title", e?.target?.value)}
        label={`Section ${number}  Title`}
        name={`section-${number}-title`}
      />

      <TextArea
        value={dataObject.body}
        onChange={(e) => handleInputChange("body", e?.target?.value)}
        label={`Section ${number}  Body`}
        name={`section-${number}-body`}
      />

      {/* Image Link */}
      <ImageInput
        label={`Section ${number} Image Link`}
        value={dataObject.imgSrc}
        name={"pageImgSrc"}
        onChange={(e) => handleInputChange("imgSrc", e?.target?.value)}
        initialValue={dataObject.imgSrc}
        setValue={() => handleInputChange("imgSrc", dataObject.imgSrc)}
        withActions={false}
        onInsert={() => {}}
      />

      <StyledResetButton onClick={() => onDeleteSection(index)}>
        Delete Section {number}
      </StyledResetButton>
      <hr />
    </AdminSection>
  );
};

const RadioWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 2rem;
`;

const ServicesWrapper = styled.div`
  margin-top: 2rem;
`;

const ServicesHeader = styled.h3`
  margin-bottom: 1rem;
`;

const AddService: React.FC = () => {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [type, setType] = useState<ServiceType>(ServiceType.TYPE_ONE);
  const [description, setDescription] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const [pageImgSrc, setPageImgSrc] = useState<string>("");

  const [sections, setSections] = useState<SectionData[]>([]);

  const emptyInputs = () => {
    setTitle("");
    setSubtitle("");
    setType(ServiceType.TYPE_ONE);
    setDescription("");
    setImgSrc("");
    setPageImgSrc("");
    setSections([]);
  };

  const [services, fetchServices] = useGetData<ServiceData[] | null>(
    "/services/",
    null,
    () => {},
    () => {}
  );

  const addService = useCallback(
    (data: ServiceData) => {
      const { title, subtitle, description, imgSrc, type, sections } = data;

      const notFilled =
        title || subtitle || description || imgSrc || type || sections;
      if (!notFilled) {
        toast(
          "title, subtitle, description, imgSrc, type, and sections are not present",
          {
            type: "error",
          }
        );
        console.error("Invalid data. Service not saved.");
      }
      toast("Inserting...");

      return pushData({
        refPath: "/services/",
        data,
        callback: () => {
          router.push("/admin/services");
          toast.dismiss();
          emptyInputs();
          toast("Service Saved");
          fetchServices();
        },
        onError: () => {
          toast.dismiss();
          emptyInputs();
          toast("Failed", { type: "error" });
          fetchServices();
        },
      });
    },
    [fetchServices, router]
  );

  const saveService = () => {
    const data = {
      title,
      subtitle,
      description,
      imgSrc,
      type, // Add other fields as needed
      sections,
    };

    addService(data);
  };

  const addSection = () => {
    const newSection: SectionData = { title: "", imgSrc: "", body: "" };
    setSections([...sections, newSection]);
  };

  const deleteSection = (index: number) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const updateSection = (index: number, newData: SectionData) => {
    if (!newData) return;
    const updatedSections = [...sections];
    updatedSections[index] = newData;
    setSections(updatedSections);
  };

  return (
    <>
      <ToastContainer />
      <AdminNav />
      <AdminWrapper>
        <AdminHeader>Add Services</AdminHeader>
        {/* Header */}
        <TextInput
          value={title}
          onChange={(e) => onInputChange(e, setTitle)}
          label={"Header"}
          name={"Header"}
        />
        {/* Subtitle */}
        <TextInput
          value={subtitle}
          onChange={(e) => onInputChange(e, setSubtitle)}
          label={"Subtitle"}
          name={"subtitle"}
        />
        {/* Description */}
        <TextArea
          value={description}
          onChange={(e) => onInputChange(e, setDescription)}
          label={"Description"}
          name={"description"}
        />
        {/* Image Link */}
        <ImageInput
          label={"Image Link"}
          value={imgSrc}
          name={"imgSrc"}
          onChange={(e) => onInputChange(e, setImgSrc)}
          initialValue={imgSrc}
          setValue={setImgSrc}
          withActions={false}
          onInsert={() => {}}
        />
        {/* Image Link */}
        <ImageInput
          label={"Page Image Link"}
          value={pageImgSrc}
          name={"pageImgSrc"}
          onChange={(e) => onInputChange(e, setPageImgSrc)}
          initialValue={pageImgSrc}
          setValue={setPageImgSrc}
          withActions={false}
          onInsert={() => {}}
        />
        <Label>Types:</Label>
        <RadioWrapper>
          {[ServiceType.TYPE_ONE, ServiceType.TYPE_TWO].map((typeItem) => (
            <AdminRadio
              key={typeItem}
              value={typeItem}
              selected={typeItem == type}
              onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                const typeValue =
                  event.currentTarget.getAttribute("data-value");
                setType(
                  typeValue === ServiceType.TYPE_TWO
                    ? ServiceType.TYPE_TWO
                    : ServiceType.TYPE_ONE
                );
              }}
            />
          ))}
        </RadioWrapper>
        {sections.length >= 0 && <hr />}
        {sections.map((section, index) => (
          <Section
            key={index}
            index={index}
            number={index + 1}
            dataObject={section}
            onDeleteSection={() => deleteSection(index)}
            onUpdateSection={updateSection}
          />
        ))}
        <StyledAddService onClick={addSection}>Add Section</StyledAddService>
        <StyledSaveButton onClick={saveService}>Save Service</StyledSaveButton>
        <ServicesWrapper>
          <ServicesHeader>Services</ServicesHeader>
          <Services
            withAction={true}
            getAllServices={true}
            type={ServiceItemTypes.typeThree}
          />
        </ServicesWrapper>
      </AdminWrapper>
    </>
  );
};

export default AddService;
