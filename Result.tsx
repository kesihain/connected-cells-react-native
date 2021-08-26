import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { appContext } from './App'
import { HStack, Stack, Center, FlatList, Container, Pressable } from 'native-base'

export default function Result() {
    const { grid, setGrid, size } = useContext(appContext)
    const [result, setResult] = useState(0)
    const [status, setStatus] = useState('calculate')
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

    const findResult = () => {
        let mat = grid
        setResult(connectedCell(mat))
        console.log(grid)
        setStatus('reset')
    }

    const reset = () => {
        let matrix = []
        for (let i = 0; i < size.row; i++) {
            let row = Array.from({ length: size.column }, () => 0)
            matrix.push(row)
        }
        setGrid(matrix)
        setStatus('calculate')
        setResult(0)
    }


    return (
        <Container py={3}>

            <Stack space={3} py={1} alignItems="center">
                <HStack space={3} alignItems="center">
                    {status == 'calculate'
                        ? <Pressable onPress={() => findResult()}>
                            <Center
                                px={3}
                                py={3}
                                size={20}
                                bg="primary.400"
                                rounded="md"
                                _text={{
                                    color: "white",
                                }}
                                shadow={3}
                            >
                                <Text>
                                    Find Result
                                </Text>

                            </Center>
                        </Pressable>
                        : <Pressable onPress={() => reset()}>
                            <Center
                                px={3}
                                py={3}
                                size={20}
                                bg="primary.400"
                                rounded="md"
                                _text={{
                                    color: "white",
                                }}
                                shadow={3}
                            >
                                <Text>
                                    Reset
                                </Text>
                            </Center>
                        </Pressable>

                    }
                    <Center
                        py={3}
                        px={3}
                        size={16}
                        bg="primary.400"
                        rounded="md"
                        _text={{
                            color: "white",
                        }}
                        shadow={3}
                    >
                        <Text>
                            {result}
                        </Text>
                    </Center>
                </HStack>
            </Stack>
        </Container>
    )
}