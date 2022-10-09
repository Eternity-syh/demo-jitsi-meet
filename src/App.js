import logo from './logo.svg';
import './App.css';

import { JaaSMeeting, JitsiMeeting } from '@jitsi/react-sdk';
import React, { useRef, useState } from 'react';

function App () {
  const host = useRef(false)
  const result = new URLSearchParams(window.location.search);
  const param = result.get('is-host') === 'true'
  host.current = param;

  const generateRoomName = () => `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`;
  const handleJitsiIFrameRef1 = iframeRef => {
    iframeRef.style.border = '10px solid #3d3d3d';
    iframeRef.style.background = '#3d3d3d';
    iframeRef.style.height = '900px';
    iframeRef.style.marginBottom = '20px';
  };
  const userInfo = {
    displayName: "demo"
  }
  const closeTheMeeting = {

  }
  const buttons = () => {
    const init = [
      "camera", //摄像头
      "chat", //开启聊天
      "desktop", //屏幕分享
      "fullscreen", //全屏
      "hangup", //离开
      "microphone", //静音
      "participants-pane", //参与者
      "profile", //个人信息
      "raisehand", //举手发言
      "select-background",//选中背景
      "settings", //设置
      "tileview", //画面模式
      "recording", //记录
    ]
    if (host.current) {
      init.push("sharedvideo") //工具箱
    }
    return init
  }
  return (
    <>
      <JitsiMeeting
        domain='jitsi.3vyd.com'
        lang="zhCN"
        roomName={generateRoomName()}
        getIFrameRef={handleJitsiIFrameRef1}
        userInfo={userInfo}
        onReadyToClose={closeTheMeeting}
        configOverwrite={{
          prejoinConfig: { enabled: false }, //禁用输入会议名称或昵称中间页,直接进入会议
          toolbarButtons: buttons(),
          disableInviteFunctions: true, //关闭participants中邀请功能
          disableReactions: true, //关闭举手时按钮右上角的表情包
          breakoutRooms: { hideAddRoomButton: true }, //关闭participants中添加讨论室功能
          buttonsWithNotifyClick: ["sharedvideo"]
        }}

      />
    </>
  );
}

export default App;
