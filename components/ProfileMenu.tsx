"use client"
import { Menu } from "@mantine/core"
import { IconSettings, IconUser } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const ProfileMenu = ({
  id,
  image,
  name,
}: {
  id: string
  image: string
  name: string
}) => {
  return (
    <Menu
      trigger="hover"
      openDelay={100}
      closeDelay={300}
      shadow="md"
      width={200}
    >
      <Menu.Target>
        <Image
          src={image || ""}
          alt={name || ""}
          width={50}
          height={50}
          className="rounded-full"
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Link href="/profile">
          <Menu.Item leftSection={<IconUser color="gray" />}>
            <p className="text-gray-400 font-semibold">View Profile</p>
          </Menu.Item>
        </Link>
        <Link href={`/profile/${id}/edit`}>
          <Menu.Item leftSection={<IconSettings color="gray" />}>
            <p className="text-gray-400 font-semibold">Manage Account</p>
          </Menu.Item>
        </Link>
      </Menu.Dropdown>
    </Menu>
  )
}

export default ProfileMenu
