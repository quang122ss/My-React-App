import React, { Fragment, useCallback, useState } from 'react'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
//useSelector
import { isJsonString } from './utils'
import { jwtDecode } from 'jwt-decode'
import * as UserService from "./services/UserServices"
import { updateUser } from './redux/Slides/userSlides'
import Loading from './components/LoadingComponents/Loading'

function App() {

  const dispatch = useDispatch();
  //const user = useSelector((state) => state.user)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetDetailsUser = useCallback( async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  },[dispatch])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }

  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded()
      if (decoded?.id) {
        handleGetDetailsUser(decoded?.id, storageData)
      }
      setIsLoading(false)
    },[handleGetDetailsUser])

  axios.interceptors.request.use(async (config) => {
    return config;
  }, (err) => {
    return Promise.reject(err)
  })

  const fetchApi = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
    return res.data
  }

  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })

  console.log('query', query)

  return (
    <div>
      <Loading isLoading={isLoading}>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            //const ischeckAuth = !route.isPrivate || user.isAdmin
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return(
              <Route key={route.path} path={route.path} element={
                 <Layout>
                   <Page />
                 </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
      </Loading>
    </div>
  )
}

export default App