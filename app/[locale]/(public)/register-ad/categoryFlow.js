"use client";
import AdForm from "./_components/real-estate/AdForm";
import VehiclesForm from "./_components/vehicles/VehiclesForm";
import DigitalForm from "./_components/digital/DigitalForm";
import DigitalFacilities from "./_components/digital/DigitalFacilities";
import RecruitmentForm from "./_components/recruitment/RecruitmentForm";
import RecruitmentAdType from "./_components/recruitment/RecruitmentAdType";
import KitchenForm from "./_components/kitchen/KitchenForm";
import ServicesForm from "./_components/services/ServicesForm";
import LocationForm from "./_components/real-estate/LocationForm";
import Facilities from "./_components/real-estate/Facilities";
import UploadPics from "./_components/real-estate/UploadPics";
import ContactInfo from "./_components/real-estate/ContactInfo";
import Conditions from "./_components/real-estate/Conditions";
import VehiclesFacilities from "./_components/vehicles/VehiclesFacilities";
import KitchenFacilities from "./_components/kitchen/KitchenFacilities";
import ServicesFacilities from "./_components/services/ServicesFacilities";
import PersonalForm from "./_components/personal/PersonalForm";
import PersonalFacilities from "./_components/personal/PersonalFacilities";
import TicketForm from "./_components/ticket/TicketForm";
import TicketFacilities from "./_components/ticket/TicketFacilities";
import BusinessForm from "./_components/business/BusinessForm";
import BusinessFacilities from "./_components/business/BusinessFacilities";
import RecruitmentFacilities from "./_components/recruitment/RecruitmentFacilities";
import RecruitmentConditions from "./_components/recruitment/RecruitmentConditions";
import VisaForm from "./_components/visa/VisaForm";
import VisaConditions from "./_components/visa/VisaConditions";
import TripForm from "./_components/trip/TripForm";
import TripConfirmation from "./_components/trip/TripConfirmation";
export const categoryApiMap = {
  housing: "/store/housing/second",
  vehicles: "/store/vehicles/second",
  electronics: "/store/electronics/second",
  jobs: "/store/jobs/second",
};
export const categoryFlows = {
  housing: [
    { component: AdForm },
    {
      component: LocationForm,
      props: { variant: "map", apiUrl: "/store/housing/second" },
    },
    { component: Facilities, props: { category: "housing" } },
    { component: UploadPics, props: { apiUrl: "/store/housing/fourth" } },
    { component: ContactInfo, props: { apiUrl: "/store/housing/fifth" } },
    {
      component: Conditions,
      props: { category: "housing", apiUrl: "store/housing/sixth" },
    },
  ],
  trip: [
    { component: TripForm },
    { component: UploadPics, props: { apiUrl: "/store/trip/second" } },
    { component: TripConfirmation },
    // {
    //   component: LocationForm,
    //   props: { variant: "map", apiUrl: "/store/housing/second" },
    // },
    // { component: Facilities, props: { category: "housing" } },
    // { component: UploadPics, props: { apiUrl: "/store/housing/fourth" } },
    // { component: ContactInfo, props: { apiUrl: "/store/housing/fifth" } },
    // {
    //   component: Conditions,
    //   props: { category: "housing", apiUrl: "store/housing/sixth" },
    // },
  ],
  visa: [
    { component: VisaForm },
    { component: VisaConditions },
    { component: UploadPics, props: { apiUrl: "/store/visa/fourth" } },
    { component: ContactInfo, props: { apiUrl: "/store/visa/fifth" } },
  ],

  digital: [
    { component: DigitalForm },
    {
      component: LocationForm,
      props: { variant: "simple", apiUrl: "/store/digital/second" },
    },
    { component: DigitalFacilities, props: { category: "digital" } },
    { component: UploadPics, props: { apiUrl: "/store/digital/fourth" } },
    { component: ContactInfo, props: { apiUrl: "/store/digital/fifth" } },
    {
      component: Conditions,
      props: { category: "digital", apiUrl: "store/digital/sixth" },
    },
  ],
  vehicles: [
    { component: VehiclesForm },
    {
      component: LocationForm,
      props: { variant: "simple", apiUrl: "/store/vehicle/second" },
    },
    { component: VehiclesFacilities, props: { category: "vehicles" } },
    { component: UploadPics, props: { apiUrl: "/store/vehicle/fourth" } },
    { component: ContactInfo, props: { apiUrl: "/store/vehicle/fifth" } },
    {
      component: Conditions,
      props: { category: "vehicles", apiUrl: "/store/vehicle/sixth" },
    },
  ],
  recruitment: [
    { component: RecruitmentForm },
    {
      component: LocationForm,
      props: { variant: "simple", apiUrl: "/store/recruitment/second" },
    },
    { component: RecruitmentFacilities, props: { category: "recruitment" } },
    { component: UploadPics, props: { apiUrl: "/store/recruitment/fourth" } },
    { component: ContactInfo, props: { apiUrl: "/store/recruitment/fifth" } },
    {
      component: RecruitmentConditions,
      props: { category: "recruitment", apiUrl: "/store/recruitment/sixth" },
    },
    { component: RecruitmentAdType },
  ],
  kitchen: [
    { component: KitchenForm },
    {
      component: LocationForm,
      props: { variant: "simple", apiUrl: "/store/kitchen/second" },
    },
    { component: KitchenFacilities, props: { category: "kitchen" } },
    { component: UploadPics, props: { apiUrl: "/store/kitchen/fourth" } },
    { component: ContactInfo, props: { apiUrl: "/store/kitchen/fifth" } },
    {
      component: Conditions,
      props: { category: "kitchen", apiUrl: "/store/kitchen/sixth" },
    },
  ],
  services: [
    { component: ServicesForm },
    {
      component: LocationForm,
      props: { variant: "simple", apiUrl: "/store/services/second" },
    },
    { component: ServicesFacilities, props: { category: "services" } },
    { component: UploadPics, props: { apiUrl: "/store/services/fourth" } },
    { component: ContactInfo, props: { apiUrl: "/store/services/fifth" } },
    {
      component: Conditions,
      props: { category: "services", apiUrl: "/store/services/sixth" },
    },
  ],
  personal: [
    { component: PersonalForm },
    {
      component: LocationForm,
      props: { variant: "simple", apiUrl: "/store/personal/second" },
    },
    { component: PersonalFacilities, props: { category: "services" } },
    { component: UploadPics, props: { apiUrl: "/store/personal/fourth" } },
    { component: ContactInfo, props: { apiUrl: "/store/personal/fifth" } },
    {
      component: Conditions,
      props: { category: "personal", apiUrl: "/store/personal/sixth" },
    },
  ],
  ticket: [
    { component: TicketForm },
    {
      component: LocationForm,
      props: { variant: "simple", apiUrl: "/store/ticket/second" },
    },
    { component: TicketFacilities, props: { category: "ticket" } },
    { component: UploadPics, props: { apiUrl: "/store/ticket/fourth" } },
    { component: ContactInfo, props: { apiUrl: "/store/ticket/fifth" } },
    {
      component: Conditions,
      props: { category: "ticket", apiUrl: "/store/ticket/sixth" },
    },
  ],
  business: [
    { component: BusinessForm },
    {
      component: LocationForm,
      props: { variant: "simple", apiUrl: "/store/business/second" },
    },
    { component: BusinessFacilities, props: { category: "business" } },
    { component: UploadPics, props: { apiUrl: "/store/business/fourth" } },
    { component: ContactInfo, props: { apiUrl: "/store/business/fifth" } },
    {
      component: Conditions,
      props: { category: "business", apiUrl: "/store/business/sixth" },
    },
  ],
  default: [
    { component: AdForm },
    { component: ContactInfo, props: { apiUrl: "/api/default/contact" } },
    {
      component: Conditions,
      props: { category: "default", apiUrl: "/store/services/sixth" },
    },
  ],
};

export const slugMap = {
  housemate: "housing",
};
