import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sample2 from './Sample2';
import Sample from './sample';


function Router() {

  return (
    <>
		<BrowserRouter>
				<Routes>
					<Route path="/" element={<Sample />}></Route>
					{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
				</Routes>
			</BrowserRouter>
    </>
  )
}

export default Router
