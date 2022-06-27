import { useRef } from "react"

export const useCheckStatus = (status: number = 999) => {
    const myStatus = useRef("")
    function checkStatus(status: number): string {
        switch (status) {
            case 0:
                myStatus.current = "Comming"
                return "neutral"
            case 1:
                myStatus.current = "Ongoing"
                return "success"
            case 2:
                myStatus.current = "Hiatus"
                return "info"
            case 3:
                myStatus.current = "Dropped"
                return "primary"
            default:
                myStatus.current = "?"
                return "neutral"
        }
    }
    return { checkStatus, myStatus }
}
