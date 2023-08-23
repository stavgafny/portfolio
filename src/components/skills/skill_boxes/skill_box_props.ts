import { IconType } from "react-icons"

export default interface SkillBoxProps {
    title: string
    markerColor: string
    icons: [IconType, IconType]
    sections?: SkillSectionProps[]
}

export interface SkillSectionProps {
    tagId: string
    content: string[]
}