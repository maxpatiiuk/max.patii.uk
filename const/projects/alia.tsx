import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
} from '../../components/projects/project';
import alia1 from '../../public/projects/images/alia/1.png';
import type { Project } from './index';

export const alia: Project = {
  gitHub: 'https://github.com/maxxxxxdlp/alia',
  title: 'Alia',
  description: 'x64, MIPS and LLVM compiler for my language',
  content: (
    <>
      <Paragraph>
        Alia is a programming language I created. It's syntax resembles C. It
        has a compiler for x64 and MIPS assembly. Additionally, it can be
        compiled down to LLVM bitcode, which in turn can be compiled for any
        architecture.
      </Paragraph>
      <Paragraph>
        In addition, Alia includes an interpreter and a hefty test coverage.
      </Paragraph>
      <Paragraph>
        For of the documentation of implementation and language specification,
        see{' '}
        <Link href="https://github.com/maxxxxxdlp/alia">Alia repository</Link>
      </Paragraph>

      <Header>Screenshot</Header>
      <Image source={alia1}>Example Alia interpreter session</Image>

      <Header>Technologies used</Header>
      <List>
        <li>Javascript ES6+</li>
        <li>TypeScript</li>
        <li>Jest</li>
        <li>Graphviz</li>
        <li>GDB assembly debugger</li>
        <li>MARS (MIPS Assembler and Runtime Simulator)</li>
      </List>
    </>
  ),
};
