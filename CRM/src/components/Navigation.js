import { createMaterialTopTabNavigator } from 'react-navigation';
import PeopleList from './PeopleList';
import CompanyList from './CompanyList';
import AddPerson from './AddPerson';

const Navigation = createMaterialTopTabNavigator(
  {
    PeopleList: { screen: PeopleList },
    AddPerson: { screen: AddPerson },
    CompanyList: { screen: CompanyList },
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#80cbc4',
      showLabel: true,
      swipeEnabled: true,
      style: {
        backgroundColor: '#26a69a',
      },
      labelStyle: {
        fontSize: 15,
      },
    },
  }
);

export default Navigation;
