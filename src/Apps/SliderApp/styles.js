import React from 'react';
import { StyleSheet } from 'react-native';
import { windowWidth } from './constants';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#1A1821',
  },
  topContainer: {
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  bottomContainer: {
    flex: 1,
  },
  buttonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 26,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonHeaderText: {
    color: '#8F6BFF',
    fontSize: 14,
    lineHeight: 26,
    fontFamily: "Inter_regular",
  },
  imageButtonHeader: {
    width: 17,
    height: 17,
  },
  titleContainer: {
    marginBottom: 24
  },
  topTitleContainer: {
    flexDirection: "row",
  },
  topTitleText: {
    color: '#F6F3FD',
    fontSize: 24,
    lineHeight: 40,
    fontFamily: "Inter_bold",
    fontWeight: 700,
  },
  topTitleEditButton: {
    width: 14,
    height: 14,
    marginLeft: 5,
  },
  subTitleText: {
    color: '#88858F',
    fontSize: 14,
    lineHeight: 26,
    fontFamily: "Inter_regular",
  },
  tabContainer: {
    height: 26,
    marginBottom: 24,
  },
  tabItem: {
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#F6F3FD',
  },
  tabItemText: {
    fontSize: 14,
    lineHeight: 26,
    color: '#88858F',
    fontFamily: "Inter_regular",
  },
  tabItemTextSelected: {
    color: '#F6F3FD',
  },
  utilContainer: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  utilImage: {
    marginHorizontal: 24,
    width: 17,
    height: 17,
  },
  modifyButtonContainer: {
    borderRadius: 5,
    backgroundColor: "#2f2b3a",
    width: "100%",
    overflow: "hidden",
    flexDirection: "row",
    paddingHorizontal: 26,
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  modifyText: {
    fontSize: 14,
    lineHeight: 26,
    fontFamily: "Inter_regular",
    color: "#8f6bff",
    textAlign: "center"
  },
  daysContainer: {
    width: windowWidth,
    paddingHorizontal: 44,
  },
  dayContainer: {
    borderRadius: 5,
    backgroundColor: "#2f2b3a",
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 24,
    alignItems: 'flex-start',
  },
  dayTitleContainer: {
    flexDirection: "row",
    alignItems: 'center'
  },
  dayTitleText: {
    fontSize: 14,
    lineHeight: 26,
    fontFamily: "Inter_regular",
    color: "#f6f3fd",
    marginRight: 4,
  },
  dayImage: {
    height: 9,
    width: 9,
  },
  dayText: {
    fontSize: 14,
    lineHeight: 26,
    fontFamily: "Inter_regular",
    color: "#f6f3fd",
    textAlign: "left"
  }
})