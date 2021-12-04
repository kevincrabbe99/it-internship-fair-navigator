

export const generateBlankTableTemplate = (x, y) => {
    return {
        x_coord: x,
        y_coord: y,
        tableUrl: '',
        company: {
            name: "",
            number_of_reps: "",
            website: "",
            other_info: "",
        }

    }
}