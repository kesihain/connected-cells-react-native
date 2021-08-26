import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, View, TextInput } from 'react-native';
import Grid from './Grid';
import { Container, NativeBaseProvider, HStack, Text, Box, Input, Center, Row } from 'native-base';
import { marginTop } from 'styled-system';


export default function App() {
  const [size,setSize] = useState({row:0,column:0})
  const [grid,setGrid] = useState([])

  useEffect(()=>{
    if(size.row>0&&size.column>0){
      // const matrix = Array.from({length:size.row},()=>Array.from({length:size.column},()=>0))
      let matrix = []
      for(let i= 0;i<size.row;i++){
        let row = Array.from({length:size.column},()=>0)
        matrix.push(row)
      } 
      setGrid(matrix)
    }
  },[size])

  const setMatrix = (text,param)=>{
    if(param=='row'){
      setSize((prev)=>{return{
        column:prev.column,
        row:parseInt(text)}
      })
    }else{
      setSize((prev=>{return{
        column:parseInt(text),
        row:prev.row
      }}))
  }
  }

  return (
    <appContext.Provider value={{grid,setGrid,size}}>
    <NativeBaseProvider>
        <Box safeAreaTop backgroundColor="#6200ee" />
        <HStack bg='#6200ee' px={1} py={3} justifyContent='space-between' alignItems='center'>
          <Text color="white" fontSize={20} fontWeight='bold'>Connected Cells</Text>
        </HStack>
      <Center flex={1}>
      <Container>
        <HStack justifyContent='space-between' alignItems='center'>
          <Text>Number of Rows</Text>
          <Input value={size.row?size.row.toString():'0'} onChangeText={text=>setMatrix(text,'row')} keyboardType="numeric"/>
        </HStack>
        <HStack justifyContent='space-between' alignItems='center'>
          <Text>Number of Columns</Text>
          <Input value={size.column?size.column.toString():'0'} onChangeText={text=>setMatrix(text,'column')} keyboardType="numeric"/>
          {/* <Text>{grid[0][0]}</Text> */}
        </HStack>
          {size.row>0&&size.column>0?<Grid size={size}></Grid>:<></>}
        
        {/* <StatusBar style="auto" /> */}
      </Container>
      </Center>
    </NativeBaseProvider>
    </appContext.Provider>
  );
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

export const appContext = React.createContext(null);
