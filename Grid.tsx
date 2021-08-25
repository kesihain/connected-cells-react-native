import React, {useContext, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { HStack, Stack, Center, FlatList, Container, Pressable } from 'native-base'
import { appContext } from './App'

export default function Grid({ size }) {
    // useEffect(()=>{
    // },[size])

    const {grid,setGrid,test,setTest} = useContext(appContext)


    const pressCell = (row,column)=>{
        debugger;
        console.log(test)
        setTest(5)
        console.log(test)

        // if(grid[row]){
            
        // }
        // let rowCopy = [...grid[row.item]]
        // rowCopy[column] = 1
        // setGrid({...grid,[row]:rowCopy})
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
                    columns.map(columnNumber=>(
                        <Pressable
                            key={columnNumber}
                            onPress={()=>pressCell(rowNumber,columnNumber)}
                        >
                            <Center
                                px={1}
                                key={columnNumber}
                                size={size.column<5?16:8}
                                bg="emerald.400"
                                rounded="md"
                                _text={{
                                    color: "white",
                                }}
                                shadow={3}
                            >
                                {grid[rowNumber]?grid[rowNumber][columnNumber]:0}
                            </Center>
                        </Pressable>
                    ))
                }
            </HStack>
        </Stack>
    )
    return (
        <Container  py={3}>
            {/* <Text>{size.row},{size.column},{typeof (size.row)}</Text> */}
            <FlatList
                data={rows}
                renderItem={rowItem}
                keyExtractor={item => item.toString()}
            />
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
    input:{
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }
  });
