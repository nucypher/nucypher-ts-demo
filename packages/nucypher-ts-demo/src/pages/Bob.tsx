import React from 'react'
import { BobReceives } from '../components/Bob/BobReceives'
import styled from 'styled-components'
import { Container, MainContent, Section, SectionRow } from '../components/base/base'
import { Title } from '../typography/Title'

export const Bob = () => {
  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Bob</Title>
          </SectionRow>
          <TableGrid>
            <BobReceives />
          </TableGrid>
        </Section>
      </Container>
    </MainContent>
  )
}

const TableGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`
