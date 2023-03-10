const asyncHandler = require('express-async-handler')
const Registry = require('../models/registryModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const items = await Registry.find({ user: req.user.id })

  res.status(200).json(items)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const registry = await Registry.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(registry)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Registry.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Registry not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Registry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Registry.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Registry not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}