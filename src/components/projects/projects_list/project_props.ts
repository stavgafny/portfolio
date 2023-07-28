import { StaticImageData } from "next/image"
import { IconType } from "react-icons"
import { IoLogoNodejs } from 'react-icons/io'
import { SiExpress, SiSocketdotio } from 'react-icons/si'
import { PiAsteriskSimpleBold } from 'react-icons/pi'
import { BiLogoFirebase, BiLogoFlutter } from 'react-icons/bi'


export type ProjectTag = 'web' | 'app' | 'game'


export default interface ProjectProps {
    name: string
    tags: ProjectTag[]
    image: StaticImageData
    description: string
    links: ProjectLinks
    tools: ProjectTool[]
}

type ProjectLinks = {
    code: string
    deployed: string | null
};

type ProjectTool = { name: string, icon: IconType };

export const projectTools = {
    node: { name: "Node.js", icon: IoLogoNodejs },
    express: { name: "Express.js", icon: SiExpress },
    socket: { name: "Socket.io", icon: SiSocketdotio },
    p5: { name: "P5.js", icon: PiAsteriskSimpleBold },
    firebase: { name: "Firebase", icon: BiLogoFirebase },
    flutter: { name: "Flutter", icon: BiLogoFlutter }
} as const satisfies Readonly<Record<string, ProjectTool>>;