const { matchedData } = require("express-validator")
const { tracksModel } = require("../models")
const { handleHttpError } = require("../utils/handleErrors")

const getItems = async (req, res) => {
  try {
    const user = req.user
    const data = await tracksModel.findAllData()
    res.send({ data, user })
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEMS")
  }
}

const getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    const data = await tracksModel.findOneData(id)
    res.send({ data })
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM")
  }
}

const createItem = async (req, res) => {
  try {
    const body = matchedData(req)
    const data = await tracksModel.create(body)
    res.send({ data })
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEM")
  }
}

const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req)
    const data = await tracksModel.findOneAndUpdate(id, body)
    res.send({ data })
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATING_ITEMS")
  }
}

const deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req

    const data = await tracksModel.delete({ _id: id })
    res.send({ data })
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_ITEM")
  }
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
}
