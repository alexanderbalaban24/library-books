const express = require("express");
const redis = require("redis");
const router = express.Router();

const REDIS_URL = process.env.REDIS_URL || "redis://localhost";

const client = redis.createClient({url: REDIS_URL});

const main = async () => {
  await client.connect();
}

main()


router.get('/:bookId', async (req, res) => {
  const {bookId} = req.params;

  try {
    const count = await client.get(bookId);
    res.status(200).json({count});
  } catch (e) {
    console.log(e)
    res.status(500).json({errCode: 500, errMsg: "Error redis"})
  }
})

router.post('/:bookId/incr', async (req, res) => {
const {bookId} = req.params;

try{
  const count = await client.incr(bookId);
  res.status(201).json({count})
} catch (e) {
  console.log(e);
  res.status(500).json({errCode: 500, errMsg: "Error redis"});

}
})

module.exports = router;
