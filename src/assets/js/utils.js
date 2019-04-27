function formatVietnameseDate(dateStr) {
    let date = new Date(dateStr)
    let returnDateStr = `${date.getDate() < 10 ? `0${date.getDate()}`: date.getDate()}/${date.getMonth() < 10 ? `0${date.getMonth()}`: date.getMonth()}/${date.getFullYear()}`

    return returnDateStr
}