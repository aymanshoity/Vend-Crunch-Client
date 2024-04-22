"use client"
import UseAxiosSecure from '@/components/Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import GroupIcon from '@mui/icons-material/Group';
import SellIcon from '@mui/icons-material/Sell';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


import { Rectangle, Tooltip, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { PieChart, Pie } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const ProductStat = () => {

    const axiosSecure = UseAxiosSecure()
    const { data: loans } = useQuery({
        queryKey: ['loans'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/loans`)
            console.log(res.data)
            return res.data
        }
    })
    const { data: stat, refetch } = useQuery({
        queryKey: ['stat'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stat')
            console.log(res.data)
            return res.data
        }
    })
    const { data: purchaseStat } = useQuery({
        queryKey: ['purchaseStat'],
        queryFn: async () => {
            const res = await axiosSecure.get('/purchase-stat')
            console.log(res.data)
            return res.data
        }
    })

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const pieChartData = purchaseStat?.map(data => {
        return { name: data.category, value: data.totalRevenue }
    })
    const compare= [
        {
            name:'Purchased',
            value: stat?.purchased
        },
        {
            name:'Loans',
            value: loans?.length
        }
    ]
    console.log(pieChartData)
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="mt-10 stats stats-vertical lg:stats-horizontal shadow">

                <div className="stat text-white bg-[#412262ff]  hover:bg-[#c07ccaff]  hover:text-white ">
                    <div className="stat-title text-white">Revenue</div>
                    <div className='flex flex-row gap-5 items-center'>
                        <AccountBalanceWalletIcon className='text-5xl' />
                        <div className="stat-value">{stat?.revenue}</div></div>




                </div>

                <div className="stat text-white bg-[#412262ff]  hover:bg-[#c07ccaff]  hover:text-white">
                    <div className="stat-title text-white">Customers</div>
                    <div className='flex flex-row gap-5 items-center'>
                        <GroupIcon className='text-5xl' />
                        <div className="stat-value">{stat?.customers}</div></div>


                </div>

                <div className="stat text-white bg-[#412262ff]  hover:bg-[#c07ccaff]  hover:text-white">
                    <div className="stat-title text-white">Products</div>
                    <div className='flex flex-row gap-5 items-center'>
                        <FastfoodIcon className='text-5xl' />
                        <div className="stat-value">{stat?.products}</div>
                    </div>

                </div>
                <div className="stat text-white bg-[#412262ff]  hover:bg-[#c07ccaff]  hover:text-white">
                    <div className="stat-title text-white">Purchased</div>
                    <div className='flex flex-row gap-5 items-center'>
                        <SellIcon className='text-5xl' />
                        <div className="stat-value">{stat?.purchased}</div></div>

                </div>

            </div>

            <div className='mt-10  mx-auto'>
                <div className='mb-5'>


                    <h1>Purchased Categories</h1>
                    <BarChart
                        width={320}
                        height={300}
                        data={purchaseStat}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {purchaseStat?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                        
                    </BarChart>

                </div>
                <div className='mt-10'>
                    <h1 className='mb-5'>Purchased Revenue</h1>
                    <PieChart width={320} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
                <div className='mt-10'>
                    <h1 className='mb-5'>Purchased VS Loan</h1>
                    
                    <BarChart
                        width={320}
                        height={300}
                        data={compare}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis dataKey="value"  />
                        <Tooltip />
                        {/* <Legend /> */}
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default ProductStat;