import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { appContext } from './App'

export default function Result(){
    const {grid} = useContext(appContext)

    
    const connectedCell = (matrix) => {
        let maxConnCells = 0;
        let curConnCells = 0;

        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] === 1) {
                    curConnCells = 1;
                    maxConnCells = Math.max(maxConnCells, hasAdjacents(matrix, r, c, curConnCells));
                }
            }
        }
        return maxConnCells;
    };

    const safeCheck = (matrix, r, c) => {
        return !(
            r < 0 ||
            r >= matrix.length ||
            c < 0 ||
            c >= matrix[r].length ||
            matrix[r][c] === 0
        );
    };

    const hasAdjacents = (matrix, r, c, curConnCells) => {
        const rows = [0, 1, 1, 1, 0, 1, -1, -1];
        const cols = [1, 1, 0, -1, -1, -1, 0, 0];

        matrix[r][c] = 0;

        for (let i = 0; i < rows.length; i++) {
            if (safeCheck(matrix, r + rows[i], c + cols[i])) {
                curConnCells++;
                curConnCells = hasAdjacents(matrix, r + rows[i], c + cols[i], curConnCells);
            }
        }
        return curConnCells;
    };

    return (
        <Text>{connectedCell(grid)}</Text>
    )
}