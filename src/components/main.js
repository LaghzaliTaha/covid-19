import React from 'react';
import { map } from 'lodash';
import { Layout, Menu } from 'antd';
import salesConsolidation from './mocks/lineChartMock';
import { chartsConfig } from './charts/LineChart/constant';
import  AwesomeLineChart  from './charts/LineChart/index';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout style={{height:'100%'}}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <UserOutlined />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <VideoCameraOutlined />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <UploadOutlined />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {map(salesConsolidation.families, (family) => (
                            <div
                                key={family.name}
                                style={{
                                    height: 222,
                                    borderLeftStyle: 'none',
                                    marginTop: 24,
                                    marginLeft: -30,
                                }}
                            >
                                <AwesomeLineChart
                                    family={family.data || []}
                                    salesSum={family.sum}
                                    currentYear={"2020"}
                                    background={chartsConfig[family.name].background}
                                    boxshadow={chartsConfig[family.name].boxShadow}
                                    familyname={chartsConfig[family.name].reportedFamilies}
                                    stroke={chartsConfig[family.name].stroke}
                                    label={chartsConfig[family.name].label}
                                    //disabled={selectedFamilyLower !== family.name}
                                    //onClick={() => onSalesConsolidationClick(family.id)}
                                    chartWidth="95%"
                                    chartHeight="100%"
                                    horizontal
                                />
                            </div>
                        ))}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default SiderDemo;

