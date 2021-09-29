export default class Timestamp {
    constructor(seconds: number | undefined, nanoseconds: number | undefined) {
        if (!seconds) {
            const now = new Date()
            this.seconds = now.getUTCSeconds()
            
            return
        }

        this.seconds = seconds
        this.nanoseconds = nanoseconds
    }

    seconds: number
    nanoseconds?: number

    toDate(): Date {
        let date = new Date(0)
        date.setUTCSeconds(this.seconds)

        return date
    }
}