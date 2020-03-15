// import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, StyleSheet, SafeAreaView, View, ScrollView} from 'react-native';
import axios from 'axios';
import baseuri from './../../../res/baseuri';
import Loader from '../../../structure/molecule/Loader';
import CustomHeader from './../../../structure/molecule/CustomHeader';
import CustomPicker from './../../../structure/molecule/CustomPicker';

const uri = {
  getAcadYear: '/api/acad_year/get',
  getSemester: '/api/semester',
};

const Clearance = () => {
  const [semesterId, setSemesterId] = useState('');
  const [acadYearId, setAcadYearId] = useState('');

  const updateSemesterId = _semesterId => {
    setSemesterId(_semesterId);
  };

  const updateAcadYearId = _acadYearId => {
    setAcadYearId(_acadYearId);
  };

  return (
    <SafeAreaView style={style.container}>
      <CustomHeader title={'My Clearance'} />

      <ScrollView>
        {/* AcadYear */}
        <CustomPicker
          updateFromComponent={updateAcadYearId}
          dataValue={acadYearId}
          label={'S.Y.'}
          uri={uri.getAcadYear}
        />

        {/* Semester */}
        <CustomPicker
          updateFromComponent={updateSemesterId}
          dataValue={semesterId}
          label={'Semester'}
          uri={uri.getSemester}
        />

        <ClearanceRecordList semesterId={semesterId} acadYearId={acadYearId} />
      </ScrollView>
    </SafeAreaView>
  );
};

// List Clearance Record
const ClearanceRecordList = ({semesterId, acadYearId}) => {
  const [items, setItems] = useState([]); // array of Semesterss
  const [loading, setLoading] = useState(true); //

  useEffect(() => {
    let updateState = true;

    console.log('@ClearanceRecordList.js +1');

    InitialApiFetch(updateState);

    // Unmounting
    return () => {
      updateState = false;
      console.log('@ClearanceRecordList.js -1');
    };
  }, []);

  useEffect(()=>{
    let updateState = true;

    console.log('@updateClearance List +1');

    InitialApiFetch(updateState);

    // Unmounting
    return () => {
      updateState = false;
      console.log('@@updateClearance List -1');
    };
  }, [semesterId, acadYearId, InitialApiFetch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const InitialApiFetch = async updateState => {
    try {
      const header = {
        headers: {
          authorization: await AsyncStorage.getItem('token'),
        },
      };

      const resultGetClearanceRecords = await axios.get(
        `${baseuri}/api/mobile/clearance/?semesterId=${semesterId}&acadYearId=${acadYearId}`,
        header,
      );

      if (updateState) {
        console.log(resultGetClearanceRecords.data.data);
        setItems(resultGetClearanceRecords.data.data || []);
        setLoading(false);
      }
    } catch (err) {
      console.log('FETCH API: ', err);
    }
  };

  if (loading) {
    return <Loader message={'Fetching Clearance records..'} />;
  }

  if (items.length === 0) {
    return (
      <View
        style={{
          margin: 16,
          flex: 1,
          padding: 3,
          borderColor: 'gray',
          borderWidth: 1 / 3,
          borderRadius: 10,
          alignItems: 'stretch',
        }}>
        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 16}}>
          Records:
        </Text>

        <Text
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 16,
            color: 'red',
          }}>
          No records found
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        margin: 16,
        flex: 1,
        padding: 3,
        borderColor: 'gray',
        borderWidth: 1 / 3,
        borderRadius: 10,
        alignItems: 'stretch',
      }}>
      <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 16}}>
        Records:
      </Text>
      <ScrollView>
        {items.map((it, ix) => {
          return (
            <View
              key={it.ci_id}
              style={{
                backgroundColor: it.clearance_status === 'PENDING' ? '#ffcdd2' : '#C8E6C9',
                margin: 5,
                borderRadius: 10,
                borderColor: '#363636',
                borderWidth: 1 / 2,
                padding: 5,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                {it.context}
              </Text>

              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 12,
                  color: it.clearance_status === 'PENDING' ? 'red' : 'green',
                }}>
                {it.clearance_status}
              </Text>

              <Text style={{fontWeight: 'bold', fontSize: 12, color: 'gray'}}>
                Issued By: {`${it.fname_by} ${it.lname_by}` || ''}{' '}
              </Text>

              <Text style={{fontWeight: 'bold', fontSize: 12, color: 'gray'}}>
                Approver: {`${it.fname_status || ''} ${it.lname_status || ''}` || ''}{' '}
              </Text>

              {/* clearance_status */}

              {/* fname_by +  */}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#303F9F',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 50,
    color: '#f8f8f8',
  },
});

export default Clearance;
