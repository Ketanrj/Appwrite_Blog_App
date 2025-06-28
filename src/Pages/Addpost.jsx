import React, { use, useEffect } from 'react'
import {Postform} from '../components/index'
import {Container} from '../components/index'

export default function Addpost() {
  return (
    <div className="py-8 bg-gray-100">
        <Container>
            <Postform post={null} />
        </Container>
    </div>
  )
}
