import { createSlice, current } from "@reduxjs/toolkit";

const initialState = []


export const bagSlice = createSlice({
    name: 'bag',
    initialState,
    reducers: {
        addToBag: (state, action) => {
            const initialBag = JSON.parse(JSON.stringify(current(state)))
            const results = [...initialBag, action.payload]
            let combinedResults = []
            const uniqueIDs = []
            results.forEach((item) => {
                console.log(item.name)
                if (!uniqueIDs.includes(item._id)) {
                    uniqueIDs.push(item._id)
                    combinedResults.push(item)
                } else {
                    const itemToUpdate = combinedResults.find((temp) => temp._id === item._id)
                    itemToUpdate.qty += item.qty
                }
            })
            return [...combinedResults]
        },
        removeFromBag: (state, action) => {
            return state.filter((item) => item._id !== action.payload._id)
        },
        updateQtyBag: (state, action) => {
            const { qty, index } = action.payload
            const currentState = JSON.parse(JSON.stringify(current(state)))
            const updatedIndex = {
                ...currentState[index],
                qty: qty
            }
            currentState[index] = { ...updatedIndex }

            return [...currentState]
        },
        clearBag: (state, action) => {
            return [...initialState]
        }

    },
    extraReducers: {}

})

export const { addToBag, removeFromBag, updateQtyBag, clearBag } = bagSlice.actions

export default bagSlice.reducer