/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component }  from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar, Platform, LogBox, AppState, DeviceEventEmitter, 
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Alert,
  Animated,
  Dimensions,
  NativeModules,
  TouchableOpacity,
} from 'react-native';

import {SafeAreaView as SafeAreaView1, SafeAreaInsetsContext   } from 'react-native-safe-area-context';

import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import mobileAds, { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';
import settings, { googleAd } from './Settings';

import ScreenUtil from './ScreenUtil'; 
import global from './Global';

const onlineReadingCache = {};
const DICT_STORAGE_KEY = 'RNJapanese:RubyDictionary:UserWords';

class App extends Component {

  rubyDictionary = {
    '今日': 'キョウ',
    '明日': 'アシタ',
    '昨日': 'キノウ',
    '一昨日': 'オトトイ',
    '毎日': 'マイニチ',
    '毎週': 'マイシュウ',
    '毎月': 'マイゲツ',
    '毎年': 'マイトシ',
    '今年': 'コトシ',
    '去年': 'キョネン',
    '来年': 'ライネン',
    '今週': 'コンシュウ',
    '先週': 'センシュウ',
    '来週': 'ライシュウ',
    '今月': 'コンゲツ',
    '先月': 'センゲツ',
    '来月': 'ライゲツ',
    '午前': 'ゴゼン',
    '午後': 'ゴゴ',
    '朝': 'アサ',
    '昼': 'ヒル',
    '夜': 'ヨル',
    '日本': 'ニホン',
    '日本語': 'ニホンゴ',
    '英語': 'エイゴ',
    '中国語': 'チュウゴクゴ',
    '東京': 'トウキョウ',
    '大阪': 'オオサカ',
    '京都': 'キョウト',
    '北海道': 'ホッカイドウ',
    '中国': 'チュウゴク',
    '学校': 'ガッコウ',
    '大学': 'ダイガク',
    '高校': 'コウコウ',
    '中学': 'チュウガク',
    '小学校': 'ショウガッコウ',
    '先生': 'センセイ',
    '学生': 'ガクセイ',
    '先輩': 'センパイ',
    '後輩': 'コウハイ',
    '時間': 'ジカン',
    '名前': 'ナマエ',
    '天気': 'テンキ',
    '晴': 'ハレ',
    '雨': 'アメ',
    '雪': 'ユキ',
    '漢字': 'カンジ',
    '平仮名': 'ヒラガナ',
    '片仮名': 'カタカナ',
    '勉強': 'ベンキョウ',
    '電話': 'デンワ',
    '番号': 'バンゴウ',
    '住所': 'ジュウショ',
    '会社': 'カイシャ',
    '仕事': 'シゴト',
    '会議': 'カイギ',
    '資料': 'シリョウ',
    '予定': 'ヨテイ',
    '友達': 'トモダチ',
    '私': 'ワタシ',
    '僕': 'ボク',
    '俺': 'オレ',
    '彼': 'カレ',
    '彼女': 'カノジョ',
    '家族': 'カゾク',
    '父': 'チチ',
    '母': 'ハハ',
    '兄': 'アニ',
    '姉': 'アネ',
    '弟': 'オトウト',
    '妹': 'イモウト',
    '子供': 'コドモ',
    '大人': 'オトナ',
    '病院': 'ビョウイン',
    '薬': 'クスリ',
    '銀行': 'ギンコウ',
    '郵便局': 'ユウビンキョク',
    '駅': 'エキ',
    '空港': 'クウコウ',
    '電車': 'デンシャ',
    '新幹線': 'シンカンセン',
    '自転車': 'ジテンシャ',
    '自動車': 'ジドウシャ',
    '道': 'ミチ',
    '右': 'ミギ',
    '左': 'ヒダリ',
    '前': 'マエ',
    '後': 'ウシロ',
    '上': 'ウエ',
    '下': 'シタ',
    '中': 'ナカ',
    '外': 'ソト',
    '国': 'クニ',
    '人': 'ヒト',
    '女': 'オンナ',
    '男': 'オトコ',
    '本': 'ホン',
    '新聞': 'シンブン',
    '雑誌': 'ザッシ',
    '映画': 'エイガ',
    '音楽': 'オンガク',
    '写真': 'シャシン',
    '料理': 'リョウリ',
    '食事': 'ショクジ',
    '朝食': 'チョウショク',
    '昼食': 'チュウショク',
    '夕食': 'ユウショク',
    '水': 'ミズ',
    '茶': 'チャ',
    '珈琲': 'コーヒー',
    '牛乳': 'ギュウニュウ',
    '肉': 'ニク',
    '魚': 'サカナ',
    '野菜': 'ヤサイ',
    '果物': 'クダモノ',
    '米': 'コメ',
    '店': 'ミセ',
    '買物': 'カイモノ',
    '値段': 'ネダン',
    '安': 'ヤス',
    '高': 'タカ',
    '多': 'オオ',
    '少': 'スク',
    '長': 'ナガ',
    '短': 'ミジカ',
    '新': 'アタラ',
    '古': 'フル',
    '白': 'シロ',
    '黒': 'クロ',
    '赤': 'アカ',
    '青': 'アオ',
    '緑': 'ミドリ',
    '金': 'キン',
    '土': 'ツチ',
    '日': 'ヒ',
    '月': 'ツキ',
    '火': 'ヒ',
    '木': 'キ',
    '曜': 'ヨウ',
    '合': 'ア',
    '話': 'ハナ',
    '聞': 'キ',
    '食': 'ショク',
    '見': 'ミ',
    '行': 'イ',
    '来': 'キ',
    '読': 'ヨ',
    '書': 'カ',
  };
    
  constructor(props) {
      super(props);

      LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
      //LogBox.ignoreAllLogs(); //Ignore all log notifications

      this.inited = false;

      ScreenUtil.init();
      //global.init();

      this.bannerRef = React.createRef();

      const screen = Dimensions.get('screen');

      this.state = {
        inited: false,
        bottomBarHeight: -1000,
        flexHeight: 0,
        orientation: screen.width > screen.height ? 'landscape' : 'portrait',
        screenData: screen,
        
        appState: AppState.currentState,

        showAddGroup: {show: false, type: 'create group'},
        showEditGroup: {show: false, grp: null}, 
        showSettingProfile: false,
        showSettingPassword: false,
        showSettingGeneral: false,
        showChat: {show: false, grp: null},
        showTips: {show: false, title: '', tips: '', type: 'error'},
        showPwd: {show: false},
        showToast: '',
        showScanQRCode: {show: false},

        toastText: '',
        toastAnim: new Animated.Value(0),
        toastVisible: false,

        inputJapanese: '',
        rubyTokens: [],
        onlineLoading: false,
        rubyScript: 'katakana',
      };
      this.inactiveTime = 0;

  }

  componentDidMount(){
    this.state.appState = AppState.currentState;
    this.loadUserRubyDictionary();
    //this.subscriptionAppState = AppState.addEventListener('change', this._handleAppStateChange);

    let self1 = this;
    /*
    setTimeout(function() {
      self1.unsubscribeNetState = NetInfo.addEventListener(state => {
          global.consoleLog("netState.type: "+ state.type);
          global.consoleLog("netState.isConnected1: "+ state.isConnected);
          self1.netStatus.isConnected = state.isConnected;
          self1.netStatus.type = state.type;
          //global.init();
      });
      //this.unsubscribeNetState();
    }, 5000);
    */

    this.listener1 = DeviceEventEmitter.addListener('cmd', (emitData) => {
      if (emitData.cmd == 'initLoaded') {
        if (global.isInited() == true) {
          global.clearCacheDirectory();
          this.subscriptionAppState = AppState.addEventListener('change', this._handleAppStateChange);
          this.setState({
            inited: true,
          })
        }
      }
      else if (emitData.cmd == 'showInputAppPwd') {
        //alert('need to input pwd')
        if (emitData.type === 'lock') {
          this.setState({showPwd:{show:true, type:'lock'}})
        }
        else {
          this.setState({showPwd:{show:true}})
        }
      }
      else if (emitData.cmd == 'showAddGroup') {
        this.setState({
          showAddGroup: {show: true, type:emitData.type},
        })
      }
      else if (emitData.cmd == 'showEditGroup') {
        this.setState({
          showEditGroup: {show:true, grp:emitData.grp}
        })
      }
      else if (emitData.cmd == 'showSettingProfile') {
        this.setState({
          showSettingProfile: true,
        })
      }
      else if (emitData.cmd == 'showSettingPassword') {
        this.setState({
          showSettingPassword: true,
        })
      }
      else if (emitData.cmd == 'showSettingGeneral') {
        this.setState({
          showSettingGeneral: true,
        })
      }
      else if (emitData.cmd == 'showChat') {
        this.setState({
          showChat: {show:true, grp:emitData.grp, netStatus:emitData.netStatus},
        })
      }
      else if (emitData.cmd == 'showTips') {
        /*
        this.setState({
          showTips: {show:true, title:emitData.title, tips:emitData.tips, type:emitData.type},
        })
          */
        //if (emitData.type === 'error') {
          Alert.alert(emitData.title, emitData.tips, [
            {
                text: ScreenUtil.getTextValue('close'),
                onPress: () => {},
            },
          ])
        //}
      }
      else if (emitData.cmd == 'showToast') {
        this.showToast(emitData.text);
      }
      else if (emitData.cmd == 'scanQRCode') {
        this.setState({
          showScanQRCode: {show:true,},
        })
      }
    })
  }

  componentWillUnmount() {
    //myBackgroundTimer.stopBackgroundTimer();
    if (this.subscriptionAppState) this.subscriptionAppState.remove();
    if (this.listener1) { this.listener1.remove(); }
  }

  _handleAppStateChange = (nextAppState) => {
    global.consoleLog('AppStatus '+this.state.appState+'/'+nextAppState);
    this.setState({appState: nextAppState});
    if (nextAppState === 'active') {
      let tNow = ( new Date()).getTime(); //ms
      if (this.inactiveTime + 3000 < tNow) {
        global.consoleLog('##authen / '+ global.enableBioAuthen)
        if (global.enableBioAuthen === true) {
          global.getCredentialsWithBiometry().then((res) => {
            global.consoleLog(res);
            if (res === null) {
              DeviceEventEmitter.emit('cmd', {cmd:'showInputAppPwd', type:'lock', });
            }
          })
        }
        else if (global.appPwd && global.appPwd.enable == true ) {
          DeviceEventEmitter.emit('cmd', {cmd:'showInputAppPwd', });
        }
      }
    }
    else if (nextAppState === 'inactive' || nextAppState === 'background') {
      this.inactiveTime = ( new Date()).getTime(); //ms
    }
  }

  render() {
    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => {

          if (this.state.flexHeight == 0 || this.state.inited === false) {
            if (Platform.OS === 'android') {
              return (
                <View style={{ flex: 1, backgroundColor:'yellow' }} onLayout={e => {

                  if (this.state.orientation === 'landscape') {
                    alert("携帯電話を縦向きにしてください。\n\n画面の向きが横向きになっています。アプリは縦向きでのみ動作します。");
                    return;
                  }
                  
                  NativeModules.MyNativeModule.getDeviceDimensions().then((dimensions) => {
                    
                      console.log("Android getDeviceDimensions", dimensions);

                      const adHeight = googleAd.enable === true ? googleAd.bottomBarHeight : 0;

                      ScreenUtil.deviceWidth = dimensions.portrait.screenWidth;
                      ScreenUtil.deviceHeight = dimensions.portrait.screenHeight;
                      ScreenUtil.statusBarHeight = dimensions.portrait.statusBarHeight;
                      ScreenUtil.nativeBottomPadding = dimensions.portrait.navigationBarHeight;
                      ScreenUtil.flexHeight = ScreenUtil.deviceHeight-ScreenUtil.statusBarHeight-ScreenUtil.nativeBottomPadding - adHeight;
                      ScreenUtil.tabFlexHeight = ScreenUtil.flexHeight-ScreenUtil.scaleHeight(ScreenUtil.navigatorBarHeight);

                      this.setState({ flexHeight: ScreenUtil.flexHeight });
                      
                      if (googleAd.enable === true) {
                        mobileAds()
                          .initialize()
                          .then(adapterStatuses => {
                            // Initialization complete!
                            global.init();
                        });
                      }
                      else {
                        global.init();
                      }

                  }).catch((err) => {
                      alert("Android getDeviceDimensions error");
                  });

                  
                  const screen = Dimensions.get('screen');
                  console.log("📱 Dimensions:", screen);
                  console.log("📱 insets1:", insets);

                              var {x, y, width, height} = e.nativeEvent.layout;
                              console.log("SafeAreaView1 onLayout", {x, y, width, height});
      
                  
                  
                }} />
              );
            }

            return ( // iOS
              <View style={{ flex: 1 }} onLayout={e => {
                if (this.state.orientation === 'landscape') {
                  alert("携帯電話を縦向きにしてください。\n\n画面の向きが横向きになっています。アプリは縦向きでのみ動作します。");
                  return;
                }

                const adHeight = googleAd.enable === true ? googleAd.bottomBarHeight : 0;

                var {x, y, width, height} = e.nativeEvent.layout;
                console.log("init View onLayout", {x, y, width, height});
                ScreenUtil.flexHeight = height - insets.top - insets.bottom - adHeight;
                ScreenUtil.tabFlexHeight = ScreenUtil.flexHeight-ScreenUtil.scaleHeight(ScreenUtil.navigatorBarHeight);
                ScreenUtil.deviceWidth = width;
                ScreenUtil.deviceHeight = height;
                this.setState({ flexHeight: ScreenUtil.flexHeight });

                const statusBarHeight = insets.top;
                const navigationBarHeight = insets.bottom;
                const leftInset = insets.left;
                const rightInset = insets.right;


                console.log("init  View Safe Area Insets (" + this.state.orientation + "):", {
                  insets,
                  statusBar: statusBarHeight,
                  navigationBar: navigationBarHeight,
                  left: leftInset,
                  right: rightInset
                });

                if (this.state.orientation === 'portrait') {
                  ScreenUtil.statusBarHeight = statusBarHeight;
                  ScreenUtil.nativeBottomPadding = navigationBarHeight;
                }

                if (googleAd.enable === true) {
                        mobileAds()
                          .initialize()
                          .then(adapterStatuses => {
                            // Initialization complete!
                            global.init();
                        });
                      }
                      else {
                        global.init();
                      }
              }}/>
            );
          }

          if (Platform.OS === 'ios') {
            return (
              <SafeAreaView1 style={{ flex: 1, flexDirection:'column', }} onLayout={(e) => {
                
                if (this.inited === false) {
                  this.inited = true;

                  const {x, y, width, height} = e.nativeEvent.layout;
                  console.log("📐 SafeAreaView Layout (" + this.state.orientation + "):", {x, y, width, height});

                  const statusBarHeight = insets.top;
                  const navigationBarHeight = insets.bottom;
                  const leftInset = insets.left;
                  const rightInset = insets.right;

                  console.log("📏 SafeAreaView1 Safe Area Insets (" + this.state.orientation + "):", {
                    insets,
                    statusBar: statusBarHeight,
                    navigationBar: navigationBarHeight,
                    left: leftInset,
                    right: rightInset
                  });

                  if (this.state.orientation === 'portrait') {
                    ScreenUtil.statusBarHeight = statusBarHeight;
                    ScreenUtil.nativeBottomPadding = navigationBarHeight;
                  }
                }
            }}>
                <View style={{ 
                      height: ScreenUtil.deviceHeight-ScreenUtil.statusBarHeight-ScreenUtil.nativeBottomPadding,
                      width: ScreenUtil.deviceWidth, }}>
                  {this.renderMainPage()}
                </View>
              </SafeAreaView1>)
          }
    
          return ( // Android
            <SafeAreaView1 style={{flex:1,}} onLayout={(e) => {
                if (this.inited === false) {
                  this.inited = true;

                }
            }}>
              {this.renderMainPage()}
            </SafeAreaView1>
          );
  
    }}
      </SafeAreaInsetsContext.Consumer>
    )
  }

  render1() {
    if (this.state.flexHeight == 0 || this.state.inited === false) {
      return (
          <View style={{ flex: 1, width:ScreenUtil.deviceWidth, height:ScreenUtil.deviceHeight, backgroundColor:'red'}} onLayout={e => {
              console.log('@#@#@# '+ e.nativeEvent.layout.height + '@#@#@# '+ ScreenUtil.nativeDeviceHeight );
              ScreenUtil.flexHeight = e.nativeEvent.layout.height - ScreenUtil.nativeSatusBarHeight - ScreenUtil.nativeBottomPadding;
              ScreenUtil.tabFlexHeight = ScreenUtil.flexHeight - ScreenUtil.scaleHeight(ScreenUtil.navigatorBarHeight);
              this.setState({flexHeight: e.nativeEvent.layout.height})
          }}>
          </View>
      );
    }

    if (Platform.OS=='ios' ) {
      if (ScreenUtil.isOnIPad==true) {
        return (
          <View style={{flex:1}}>
            {this.renderMainPage()}
          </View>
        )
      }
      return (
        <View style={{flex:1}}>
          <View style={{backgroundColor:'transparent',
              height:ScreenUtil.nativeSatusBarHeight}} >
                {/*
            <StatusBar 
              barStyle={'light-content'} />
                */}
          </View>

          {this.renderMainPage()}
          
        </View>
      )
    }
    return (
      <View style={{flex:1}}>
        <StatusBar
          barStyle={'dark-content'}
          //backgroundColor={backgroundStyle.backgroundColor}
        />
        {this.renderMainPage()}
      </View>
    )
  }

  showToast = (text) => {
    //console.log('showToast')
    this.state.toastText = text;
    this.state.toastVisible = true;
    this.setState({
      toastText:text,
      toastVisible: true,
    })
    Animated.timing(this.state.toastAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(this.state.toastAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {this.setState({toastVisible:false})});
      }, 2000);
    });
  };

  isKanjiChar = (ch) => {
    return /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF々]/.test(ch);
  };

  toKatakana = (text) => {
    let ret = '';
    for (const ch of text) {
      const code = ch.charCodeAt(0);
      if (code >= 0x3041 && code <= 0x3096) {
        ret += String.fromCharCode(code + 0x60);
      }
      else {
        ret += ch;
      }
    }
    return ret;
  };

  toHiragana = (text) => {
    let ret = '';
    for (const ch of text || '') {
      const code = ch.charCodeAt(0);
      if (code >= 0x30A1 && code <= 0x30F6) {
        ret += String.fromCharCode(code - 0x60);
      }
      else {
        ret += ch;
      }
    }
    return ret;
  };

  formatRubyReading = (text) => {
    const katakana = this.toKatakana(text || '');
    if (this.state.rubyScript === 'hiragana') {
      return this.toHiragana(katakana);
    }
    return katakana;
  };

  findLongestDictionaryWord = (text, start) => {
    let foundWord = '';
    let foundRuby = '';
    for (const word of Object.keys(this.rubyDictionary)) {
      if (word.length <= foundWord.length) {
        continue;
      }
      if (text.startsWith(word, start)) {
        foundWord = word;
        foundRuby = this.rubyDictionary[word];
      }
    }
    return {word: foundWord, ruby: foundRuby};
  };

  findLongestWordFromMap = (text, start, wordMap) => {
    let foundWord = '';
    let foundRuby = '';

    for (const word of Object.keys(wordMap || {})) {
      if (word.length <= foundWord.length) {
        continue;
      }
      if (text.startsWith(word, start)) {
        foundWord = word;
        foundRuby = wordMap[word];
      }
    }

    return {word: foundWord, ruby: foundRuby};
  };

  isKanaChar = (ch) => {
    return /[\u3041-\u3096\u30A1-\u30FA\u30FC]/.test(ch);
  };

  getKanaAnchor = (text) => {
    let anchor = '';
    const chars = Array.from(text || '');
    for (let index = 0; index < chars.length; index += 1) {
      let ch = chars[index];

      // Normalize common particle pronunciations for sentence-reading alignment.
      if (ch === 'は') {
        ch = 'わ';
      }
      else if (ch === 'を') {
        ch = 'お';
      }
      else if (ch === 'へ') {
        ch = 'え';
      }

      if (this.isKanaChar(ch)) {
        anchor += ch;
      }
    }
    return this.toKatakana(anchor);
  };

  splitByKanjiBlocks = (text) => {
    const parts = [];
    let current = '';
    let currentIsKanji = null;

    for (const ch of text) {
      const isKanji = this.isKanjiChar(ch);
      if (current.length === 0) {
        current = ch;
        currentIsKanji = isKanji;
        continue;
      }

      if (currentIsKanji === isKanji) {
        current += ch;
      }
      else {
        parts.push({base: current, isKanji: currentIsKanji});
        current = ch;
        currentIsKanji = isKanji;
      }
    }

    if (current.length > 0) {
      parts.push({base: current, isKanji: currentIsKanji});
    }

    return parts;
  };

  normalizeKatakanaForAlign = (text) => {
    let out = '';
    for (const ch of text || '') {
      if (/[\u30A1-\u30FA\u30FC]/.test(ch)) {
        out += ch;
      }
    }
    return out;
  };

  alignSentenceReadingByChar = (text, readingKatakana) => {
    const src = Array.from(text || '');
    const reading = Array.from(this.normalizeKatakanaForAlign(readingKatakana));
    const memo = {};

    const solve = (i, j) => {
      const key = `${i}|${j}`;
      if (memo[key]) {
        return memo[key];
      }

      if (i >= src.length) {
        const restPenalty = (reading.length - j) * 2;
        const ret = {cost: restPenalty, steps: []};
        memo[key] = ret;
        return ret;
      }

      const ch = src[i];
      let best = null;

      const updateBest = (candidate) => {
        if (!candidate) {
          return;
        }
        if (!best || candidate.cost < best.cost) {
          best = candidate;
        }
      };

      if (this.isKanjiChar(ch)) {
        const maxLen = Math.min(8, reading.length - j);
        for (let len = 1; len <= maxLen; len += 1) {
          const ruby = reading.slice(j, j + len).join('');
          const next = solve(i + 1, j + len);
          const lengthPenalty = Math.abs(len - 2);
          updateBest({
            cost: next.cost + lengthPenalty,
            steps: [{base: ch, ruby, kind: 'ruby'}, ...next.steps],
          });
        }

        if (maxLen === 0) {
          const next = solve(i + 1, j);
          updateBest({
            cost: next.cost + 8,
            steps: [{base: ch, ruby: '', kind: 'ruby'}, ...next.steps],
          });
        }
      }
      else if (this.isKanaChar(ch)) {
        const katakanaChar = this.toKatakana(ch);
        if (j < reading.length && reading[j] === katakanaChar) {
          const next = solve(i + 1, j + 1);
          updateBest({
            cost: next.cost,
            steps: [{base: ch, ruby: '', kind: 'plain'}, ...next.steps],
          });
        }

        if (j < reading.length) {
          const skip = solve(i, j + 1);
          updateBest({
            cost: skip.cost + 6,
            steps: skip.steps,
          });
        }

        const consume = solve(i + 1, j);
        updateBest({
          cost: consume.cost + 6,
          steps: [{base: ch, ruby: '', kind: 'plain'}, ...consume.steps],
        });
      }
      else {
        const next = solve(i + 1, j);
        updateBest({
          cost: next.cost,
          steps: [{base: ch, ruby: '', kind: 'plain'}, ...next.steps],
        });
      }

      memo[key] = best || {cost: 999999, steps: [{base: ch, ruby: '', kind: 'plain'}]};
      return memo[key];
    };

    const solved = solve(0, 0);
    return solved.steps || [];
  };

  mergePlainTokens = (tokens) => {
    const merged = [];
    for (const tk of tokens) {
      if (tk.kind === 'plain') {
        const last = merged.length > 0 ? merged[merged.length - 1] : null;
        if (last && last.kind === 'plain') {
          last.base += tk.base;
        }
        else {
          merged.push({...tk});
        }
      }
      else {
        merged.push({...tk});
      }
    }
    return merged;
  };

  splitTextByPunctuationForOnline = (text, maxLength = 140) => {
    if (!text || text.length <= maxLength) {
      return [text || ''];
    }

    const result = [];
    let current = '';
    const splitRegex = /([。！？!?\n])/;
    const pieces = text.split(splitRegex);

    for (const piece of pieces) {
      if (!piece) {
        continue;
      }

      if ((current + piece).length > maxLength && current.length > 0) {
        result.push(current);
        current = piece;
      }
      else {
        current += piece;
      }
    }

    if (current.length > 0) {
      result.push(current);
    }

    return result;
  };

  extractRomajiString = (node) => {
    let best = '';

    const walk = (value) => {
      if (typeof value === 'string') {
        const hasLatin = /[A-Za-z]/.test(value);
        const hasJapanese = /[\u3040-\u30FF\u3400-\u9FFF]/.test(value);
        const looksLikeFile = /\.md$/.test(value);
        if (hasLatin && !hasJapanese && !looksLikeFile && value.length > best.length) {
          best = value;
        }
        return;
      }

      if (Array.isArray(value)) {
        value.forEach(walk);
        return;
      }

      if (value && typeof value === 'object') {
        Object.values(value).forEach(walk);
      }
    };

    walk(node);
    return best;
  };

  romajiToKatakana = (romajiText) => {
    if (!romajiText) {
      return '';
    }

    const map3 = {
      kya: 'キャ', kyu: 'キュ', kyo: 'キョ',
      gya: 'ギャ', gyu: 'ギュ', gyo: 'ギョ',
      sha: 'シャ', shu: 'シュ', sho: 'ショ',
      ja: 'ジャ', ju: 'ジュ', jo: 'ジョ',
      cha: 'チャ', chu: 'チュ', cho: 'チョ',
      nya: 'ニャ', nyu: 'ニュ', nyo: 'ニョ',
      hya: 'ヒャ', hyu: 'ヒュ', hyo: 'ヒョ',
      bya: 'ビャ', byu: 'ビュ', byo: 'ビョ',
      pya: 'ピャ', pyu: 'ピュ', pyo: 'ピョ',
      mya: 'ミャ', myu: 'ミュ', myo: 'ミョ',
      rya: 'リャ', ryu: 'リュ', ryo: 'リョ',
      tsu: 'ツ',
    };

    const map2 = {
      ka: 'カ', ki: 'キ', ku: 'ク', ke: 'ケ', ko: 'コ',
      ga: 'ガ', gi: 'ギ', gu: 'グ', ge: 'ゲ', go: 'ゴ',
      sa: 'サ', shi: 'シ', su: 'ス', se: 'セ', so: 'ソ',
      za: 'ザ', ji: 'ジ', zu: 'ズ', ze: 'ゼ', zo: 'ゾ',
      ta: 'タ', chi: 'チ', te: 'テ', to: 'ト',
      da: 'ダ', de: 'デ', do: 'ド',
      na: 'ナ', ni: 'ニ', nu: 'ヌ', ne: 'ネ', no: 'ノ',
      ha: 'ハ', hi: 'ヒ', fu: 'フ', he: 'ヘ', ho: 'ホ',
      ba: 'バ', bi: 'ビ', bu: 'ブ', be: 'ベ', bo: 'ボ',
      pa: 'パ', pi: 'ピ', pu: 'プ', pe: 'ペ', po: 'ポ',
      ma: 'マ', mi: 'ミ', mu: 'ム', me: 'メ', mo: 'モ',
      ya: 'ヤ', yu: 'ユ', yo: 'ヨ',
      ra: 'ラ', ri: 'リ', ru: 'ル', re: 'レ', ro: 'ロ',
      wa: 'ワ', wo: 'ヲ',
    };

    const map1 = {
      a: 'ア', i: 'イ', u: 'ウ', e: 'エ', o: 'オ',
    };

    let text = romajiText
      .toLowerCase()
      .replace(/ā/g, 'aa')
      .replace(/ī/g, 'ii')
      .replace(/ū/g, 'uu')
      .replace(/ē/g, 'ei')
      .replace(/ō/g, 'ou')
      .replace(/-/g, ' ');

    let out = '';
    let i = 0;
    while (i < text.length) {
      const ch = text[i];

      if (!/[a-z]/.test(ch)) {
        i += 1;
        continue;
      }

      const next = text[i + 1] || '';
      if (ch === next && /[bcdfghjklmpqrstvwxyz]/.test(ch) && ch !== 'n') {
        out += 'ッ';
        i += 1;
        continue;
      }

      if (ch === 'n') {
        if (i === text.length - 1) {
          out += 'ン';
          i += 1;
          continue;
        }
        if (next === ' ') {
          out += 'ン';
          i += 1;
          continue;
        }
        if (!/[aeiouy]/.test(next)) {
          out += 'ン';
          i += 1;
          continue;
        }
      }

      const t3 = text.slice(i, i + 3);
      if (map3[t3]) {
        out += map3[t3];
        i += 3;
        continue;
      }

      const t2 = text.slice(i, i + 3);
      if (map2[t2]) {
        out += map2[t2];
        i += 3;
        continue;
      }

      const t1 = text.slice(i, i + 2);
      if (map2[t1]) {
        out += map2[t1];
        i += 2;
        continue;
      }

      if (map1[ch]) {
        out += map1[ch];
      }
      i += 1;
    }

    return out;
  };

  fetchSentenceReadingKatakana = async (text) => {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=en&dt=t&dt=rm&q=${encodeURIComponent(text)}`;
      const resp = await fetch(url);
      if (!resp.ok) {
        return '';
      }
      const json = await resp.json();

      let romaji = '';

      // Preferred path for Google response: json[0][1][3]
      if (Array.isArray(json) && Array.isArray(json[0]) && Array.isArray(json[0][1]) && typeof json[0][1][3] === 'string') {
        romaji = json[0][1][3];
      }

      // Fallback: collect segment-level romanization from json[0][*][3]
      if (!romaji && Array.isArray(json) && Array.isArray(json[0])) {
        const segmentRomaji = json[0]
          .map((seg) => (Array.isArray(seg) && typeof seg[3] === 'string' ? seg[3] : ''))
          .filter((s) => s);
        if (segmentRomaji.length > 0) {
          romaji = segmentRomaji.join(' ');
        }
      }

      if (!romaji) {
        romaji = this.extractRomajiString(json);
      }

      return this.romajiToKatakana(romaji);
    }
    catch (e) {
      return '';
    }
  };

  buildTokensFromSentenceReading = (segmentText, segmentReading, learnedEntries) => {
    const parts = this.splitByKanjiBlocks(segmentText);
    const normalizedReading = this.normalizeKatakanaForAlign(segmentReading);
    const tokens = [];
    let readingPos = 0;
    let pendingKanjiIndex = -1;

    const finalizePendingKanji = (ruby) => {
      if (pendingKanjiIndex < 0) {
        return;
      }

      const pendingToken = tokens[pendingKanjiIndex];
      const fallbackRuby = this.rubyDictionary[pendingToken.base] || '';
      const finalRuby = ruby || fallbackRuby || '・';

      if (pendingToken.base.length > 1 && finalRuby && finalRuby !== '・' && !this.rubyDictionary[pendingToken.base]) {
        learnedEntries[pendingToken.base] = finalRuby;
      }

      tokens[pendingKanjiIndex] = {
        ...pendingToken,
        ruby: finalRuby,
      };
      pendingKanjiIndex = -1;
    };

    for (const part of parts) {
      if (part.isKanji) {
        tokens.push({base: part.base, ruby: '', kind: 'ruby'});
        pendingKanjiIndex = tokens.length - 1;
        continue;
      }

      const anchor = this.getKanaAnchor(part.base);
      if (anchor) {
        const anchorIndex = normalizedReading.indexOf(anchor, readingPos);
        if (anchorIndex >= readingPos) {
          const rubyForPending = normalizedReading.slice(readingPos, anchorIndex);
          finalizePendingKanji(rubyForPending);
          readingPos = anchorIndex + anchor.length;
        }
      }
      else {
        finalizePendingKanji('');
      }

      tokens.push({base: part.base, ruby: '', kind: 'plain'});
    }

    if (pendingKanjiIndex >= 0) {
      finalizePendingKanji(normalizedReading.slice(readingPos));
    }

    return this.mergePlainTokens(tokens);
  };

  extractKanjiChunks = (text) => {
    const chunks = [];
    let current = '';
    for (const ch of text) {
      if (this.isKanjiChar(ch)) {
        current += ch;
      }
      else {
        if (current.length > 0) {
          chunks.push(current);
          current = '';
        }
      }
    }
    if (current.length > 0) {
      chunks.push(current);
    }
    return Array.from(new Set(chunks));
  };

  fetchReadingFromJisho = async (word) => {
    if (onlineReadingCache[word]) {
      return onlineReadingCache[word];
    }

    try {
      const url = `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(word)}`;
      const resp = await fetch(url);
      if (!resp.ok) {
        return '';
      }
      const json = await resp.json();
      const list = Array.isArray(json?.data) ? json.data : [];

      let reading = '';
      const exact = list.find((it) => Array.isArray(it?.japanese) && it.japanese.some((j) => j.word === word && j.reading));
      if (exact) {
        const jp = exact.japanese.find((j) => j.word === word && j.reading);
        reading = jp?.reading || '';
      }

      if (!reading && list.length > 0) {
        const firstJp = Array.isArray(list[0].japanese) ? list[0].japanese[0] : null;
        reading = firstJp?.reading || '';
      }

      const katakana = this.toKatakana(reading);
      if (katakana) {
        onlineReadingCache[word] = katakana;
      }
      return katakana;
    }
    catch (e) {
      return '';
    }
  };

  loadUserRubyDictionary = async () => {
    try {
      const raw = await AsyncStorage.getItem(DICT_STORAGE_KEY);
      if (!raw) {
        return;
      }
      const userDictionary = JSON.parse(raw);
      if (userDictionary && typeof userDictionary === 'object') {
        this.rubyDictionary = {
          ...this.rubyDictionary,
          ...userDictionary,
        };
      }
    }
    catch (e) {
      console.log('loadUserRubyDictionary error', e);
    }
  };

  persistUserRubyDictionary = async (newEntries) => {
    const keys = Object.keys(newEntries || {});
    if (keys.length === 0) {
      return;
    }

    try {
      const raw = await AsyncStorage.getItem(DICT_STORAGE_KEY);
      let currentDictionary = {};
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          currentDictionary = parsed;
        }
      }

      const mergedDictionary = {
        ...currentDictionary,
        ...newEntries,
      };

      await AsyncStorage.setItem(DICT_STORAGE_KEY, JSON.stringify(mergedDictionary));

      this.rubyDictionary = {
        ...this.rubyDictionary,
        ...newEntries,
      };
    }
    catch (e) {
      console.log('persistUserRubyDictionary error', e);
    }
  };

  buildRubyTokensOffline = (text) => {
    const tokens = [];
    let i = 0;

    while (i < text.length) {
      const matched = this.findLongestDictionaryWord(text, i);
      if (matched.word) {
        tokens.push({base: matched.word, ruby: matched.ruby, kind: 'ruby'});
        i += matched.word.length;
        continue;
      }

      const ch = text[i];
      if (this.isKanjiChar(ch)) {
        tokens.push({base: ch, ruby: '・', kind: 'ruby'});
      }
      else {
        tokens.push({base: ch, ruby: '', kind: 'plain'});
      }
      i += 1;
    }
    return tokens;
  };

  buildRubyTokensOnline = async (text) => {
    const segments = this.splitTextByPunctuationForOnline(text, 140);
    const allTokens = [];
    const learnedEntries = {};

    for (const segment of segments) {
      if (!segment) {
        continue;
      }

      // Online mode: one request per sentence/segment only, then align kanji readings from full-sentence reading.
      const sentenceReading = await this.fetchSentenceReadingKatakana(segment);
      if (sentenceReading) {
        const segmentTokens = this.buildTokensFromSentenceReading(segment, sentenceReading, learnedEntries);
        allTokens.push(...segmentTokens);
      }
      else {
        const fallbackTokens = this.buildRubyTokensOffline(segment);
        allTokens.push(...fallbackTokens);
      }
    }

    await this.persistUserRubyDictionary(learnedEntries);
    return allTokens;
  };

  onPressOfflineConvert = () => {
    if (this.isInputEmpty()) {
      return;
    }
    const rubyTokens = this.buildRubyTokensOffline(this.state.inputJapanese || '');
    this.setState({rubyTokens});
  };

  onPressOnlineConvert = async () => {
    if (this.isInputEmpty()) {
      return;
    }
    this.setState({onlineLoading: true});
    const rubyTokens = await this.buildRubyTokensOnline(this.state.inputJapanese || '');
    this.setState({rubyTokens, onlineLoading: false});
  };

  onPressClear = () => {
    this.setState({
      inputJapanese: '',
      rubyTokens: [],
      onlineLoading: false,
    });
  };

  isInputEmpty = () => {
    return !this.state.inputJapanese || this.state.inputJapanese.trim().length === 0;
  };

  renderRubyResult = () => {
    const tokens = this.state.rubyTokens || [];
    if (tokens.length === 0) {
      return (
        <Text style={styles.placeholderText}>输入日文后点击确定，结果显示在这里</Text>
      );
    }

    return (
      <View style={styles.rubyWrap}>
        {tokens.map((token, index) => {
          if (token.kind === 'ruby') {
            return (
              <View key={`ruby-${index}`} style={styles.rubyToken}>
                <Text style={styles.rubyText}>{this.formatRubyReading(token.ruby)}</Text>
                <Text style={styles.baseText}>{token.base}</Text>
              </View>
            );
          }

          return (
            <View key={`plain-${index}`} style={styles.plainToken}>
              <Text style={styles.baseText}>{token.base}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  renderMainPage1() {
    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'red',}} />
    )
  }
  renderMainPage() {
    const disableActions = this.isInputEmpty();

    return (
      <View style={{height:'100%', width:'100%', backgroundColor:'red', flexDirection:'column'
            }}>
        <ScrollView style={{height:ScreenUtil.flexHeight, width:ScreenUtil.deviceWidth, backgroundColor:'white', }}>
          <View style={styles.inputAreaWrap}>
            <View style={styles.labelRow}>
              <Text style={styles.inputLabel}>请输入日文</Text>
              <TouchableOpacity
                style={[styles.clearButtonSmall, disableActions && styles.disabledButton]}
                onPress={this.onPressClear}
                disabled={disableActions}
              >
                <Text style={styles.clearButtonText}>clear</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.inputArea}
              value={this.state.inputJapanese}
              onChangeText={(inputJapanese) => this.setState({inputJapanese})}
              multiline={true}
              placeholder={'例如: 私は東京で日本語を勉強します'}
              placeholderTextColor={'#999'}
            />
            <View style={styles.scriptRow}>
              <Text style={styles.scriptLabel}>标注:</Text>
              <TouchableOpacity
                style={[styles.scriptOption, this.state.rubyScript === 'katakana' && styles.scriptOptionActive]}
                onPress={() => this.setState({rubyScript: 'katakana'})}
              >
                <Text style={[styles.scriptOptionText, this.state.rubyScript === 'katakana' && styles.scriptOptionTextActive]}>片假名</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.scriptOption, this.state.rubyScript === 'hiragana' && styles.scriptOptionActive]}
                onPress={() => this.setState({rubyScript: 'hiragana'})}
              >
                <Text style={[styles.scriptOptionText, this.state.rubyScript === 'hiragana' && styles.scriptOptionTextActive]}>平假名</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <View style={styles.confirmGroup}>
                <TouchableOpacity
                  style={[styles.confirmButton, disableActions && styles.disabledButton]}
                  onPress={this.onPressOfflineConvert}
                  disabled={disableActions}
                >
                  <Text style={styles.confirmButtonText}>离线词典确定</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.confirmButtonOnline, disableActions && styles.disabledButton]}
                  onPress={this.onPressOnlineConvert}
                  disabled={disableActions}
                >
                  <Text style={styles.confirmButtonText}>{this.state.onlineLoading ? '在线查询中...' : '在线 API 确定'}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[styles.clearButton, styles.clearButtonInline, disableActions && styles.disabledButton]}
                onPress={this.onPressClear}
                disabled={disableActions}
              >
                <Text style={styles.clearButtonText}>clear</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.resultBox}>
              {this.renderRubyResult()}
            </View>
            <View style={styles.bottomActionWrap}>
              <TouchableOpacity
                style={[styles.clearButtonBottom, disableActions && styles.disabledButton]}
                onPress={this.onPressClear}
                disabled={disableActions}
              >
                <Text style={styles.clearButtonText}>clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {googleAd.enable === true && 
          <BannerAd ref={this.bannerRef} unitId={TestIds.ADAPTIVE_BANNER} size={BannerAdSize.LARGE_ANCHORED_ADAPTIVE_BANNER} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputAreaWrap: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  inputArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    minHeight: 90,
    textAlignVertical: 'top',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#222',
    backgroundColor: '#fff',
  },
  scriptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  scriptLabel: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
    fontWeight: '600',
  },
  scriptOption: {
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  scriptOptionActive: {
    borderColor: '#0b6bcb',
    backgroundColor: '#eaf3ff',
  },
  scriptOptionText: {
    color: '#555',
    fontSize: 13,
    fontWeight: '600',
  },
  scriptOptionTextActive: {
    color: '#0b6bcb',
  },
  confirmButton: {
    marginTop: 12,
    backgroundColor: '#0b6bcb',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  confirmButtonOnline: {
    marginTop: 12,
    backgroundColor: '#247a2a',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  confirmGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
  },
  clearButtonSmall: {
    backgroundColor: '#6e6e6e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  clearButton: {
    backgroundColor: '#6e6e6e',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  clearButtonInline: {
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  bottomActionWrap: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  clearButtonBottom: {
    backgroundColor: '#6e6e6e',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.45,
  },
  resultBox: {
    marginTop: 14,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fcfcfc',
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
  },
  rubyWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  rubyToken: {
    alignItems: 'center',
    marginRight: 2,
    marginBottom: 4,
  },
  plainToken: {
    justifyContent: 'flex-end',
    marginRight: 1,
    marginBottom: 4,
    minHeight: 30,
  },
  rubyText: {
    fontSize: 10,
    color: '#1f5fa8',
    lineHeight: 12,
    fontWeight: '600',
  },
  baseText: {
    fontSize: 22,
    color: '#111',
    lineHeight: 26,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
