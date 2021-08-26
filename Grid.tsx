import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { HStack, Stack, Center, FlatList, Container, Pressable } from 'native-base'
import { appContext } from './App'
import Result from './Result'

export default function Grid({ size }) {
    
    const { grid, setGrid } = useContext(appContext)

    const pressCell = (row, column) => {
        setGrid(prev => {
            let temp = [...prev]
            if (prev[row.item][column] == 0) {
                temp[row.item][column] = 1
            } else {
                temp[row.item][column] = 0
            }
            return temp
        })
    }

    const rows = Array.from(Array(size.row).keys())
    const columns = Array.from(Array(size.column).keys())
    const rowItem = (rowNumber) => (
        // <View>
        //     <Text>1</Text>
        // </View>
        <Stack space={3} py={1} alignItems="center">
            <HStack space={3} alignItems="center">
                {
                    columns.map(columnNumber => (
                        <Pressable
                            key={columnNumber}
                            onPress={() => pressCell(rowNumber, columnNumber)}
                        >
                            <Center
                                px={1}
                                key={columnNumber}
                                size={size.column < 5 ? 16 : 8}
                                bg="emerald.400"
                                rounded="md"
                                _text={{
                                    color: "white",
                                }}
                                shadow={3}
                            >
                                <Text>
                                {grid[rowNumber.item] ? grid[rowNumber.item][columnNumber] : 0}
                                </Text>
                            </Center>
                        </Pressable>
                    ))
                }
            </HStack>
        </Stack>
    )
    return (
        <Container py={3}>
            {/* <Text>{size.row},{size.column},{typeof (size.row)}</Text> */}
            <FlatList
                data={rows}
                renderItem={rowItem}
                keyExtractor={item => item.toString()}
            />
            {/* <Text>{connectedCell(grid)}</Text> */}
            <Result></Result>
        </Container>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});
