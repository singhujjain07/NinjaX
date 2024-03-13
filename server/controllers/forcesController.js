import axios from 'axios'
export const problemsByRatingController = async (req, res) => {
    try {
        const { handle } = req.query;
        const response = await axios.get(`${process.env.FORCES_USER_STATUS}${handle}`);
        res.json(response.data);
    } catch (error) {
        // console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in grtting problems solved',
            error
        })
    }
}

export const ratingController = async (req, res) => {
    try {
        const { handle } = req.query;
        const response = await axios.get(`${process.env.FORCES_USER_RATING}${handle}`);
        res.json(response.data);
    } catch (error) {
        // console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in grtting problems solved',
            error
        })
    }
}

export const userInfoController = async (req, res) => {
    try {
        const { handle } = req.query;
        const response = await axios.get(`${process.env.FORCES_USER_INFO}${handle}`);
        res.json(response.data);
    } catch (error) {
        // console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in grtting problems solved',
            error
        })
    }
}