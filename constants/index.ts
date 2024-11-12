import {
  IconBriefcase,
  IconCake,
  IconDeviceDesktop,
  IconDeviceGamepad2,
  IconDeviceTvOld,
  IconFlower,
  IconHeartbeat,
  IconHeartHandshake,
  IconMap2,
  IconMusic,
  IconPalette,
  IconSchool,
  IconSoccerField,
} from "@tabler/icons-react"

export const categories = [
  { label: "Tech", Icon: IconDeviceDesktop },
  { label: "Food", Icon: IconCake },
  { label: "Music", Icon: IconMusic },
  { label: "Sports", Icon: IconSoccerField },
  { label: "Education", Icon: IconSchool },
  { label: "Art & Culture", Icon: IconPalette },
  { label: "Health & Wellness", Icon: IconHeartbeat },
  { label: "Business & Networking", Icon: IconBriefcase },
  { label: "Lifestyle", Icon: IconFlower },
  { label: "Charity & Fundraising", Icon: IconHeartHandshake },
  { label: "Travel & Adventure", Icon: IconMap2 },
  { label: "Gaming", Icon: IconDeviceGamepad2 },
  { label: "Film & Media", Icon: IconDeviceTvOld },
]

export const categoryLabels = categories.map((category) => category.label)
