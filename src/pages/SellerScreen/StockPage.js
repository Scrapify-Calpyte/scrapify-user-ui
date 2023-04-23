import { Stack, Box, Grid, Typography, Tooltip } from '@mui/material/index';
import useScreenSize from '~/components/useScreenSize';
import { ThemeContext } from '~/util/ThemeProvider';
import img from '~assets/images/seller_img1.PNG';
import { useContext, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ListItemButton from '@mui/material/ListItemButton';
import InfoIcon from '@mui/icons-material/Info';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useMediaQuery } from '@mui/material/index';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function StockPage() {
    const [width, height] = useScreenSize();
    const { colors } = useContext(ThemeContext);
    const [value, setValue] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const matches = useMediaQuery('(max-width:768px)');

    const products = [
        {
            id: 0,
            name: 'Paper',
            categories: [
                {
                    id: 0,
                    name: 'Corrugated/Kraft paper'
                },
                {
                    id: 0,
                    name: 'Newspapers/newsprint'
                },
                {
                    id: 0,
                    name: 'High-grade papers'
                }
            ]
        },
        {
            id: 1,
            name: 'Cardboard',
            categories: [
                {
                    id: 0,
                    name: 'Corrugated fiberboard'
                },
                {
                    id: 0,
                    name: 'Single-face board'
                },
                {
                    id: 0,
                    name: 'Single-wall board'
                }
            ]
        },
        {
            id: 2,
            name: 'Plastic',
            categories: [
                {
                    id: 0,
                    name: 'Polyethylene Terephthalate (PET)'
                },
                {
                    id: 0,
                    name: 'High-Density Polyethylene (HDPE)'
                },
                {
                    id: 0,
                    name: 'Polyvinyl Chloride (PVC)'
                }
            ]
        },
        {
            id: 3,
            name: 'Plastic Cover',
            categories: [
                {
                    id: 0,
                    name: 'Low-density polyethylene (LDPE)'
                },
                {
                    id: 0,
                    name: 'Linear Low-Density Polyethylene (LLDPE)'
                },
                {
                    id: 0,
                    name: 'Ultra Low-Density Polyethylene (ULDPE)'
                }
            ]
        },
        {
            id: 4,
            name: 'Metal',
            categories: [
                {
                    id: 0,
                    name: 'Iron'
                },
                {
                    id: 0,
                    name: ' Steel'
                },
                {
                    id: 0,
                    name: 'Aluminium'
                }
            ]
        }
    ];

    useEffect(() => {
        setValue([products[0]]);
        handleChange(null, [products[0]]);
    }, []);

    const handleChange = (event, newValue) => {
        let arr = [];
        let arr2 = [];
        console.log(newValue);
        if (newValue.length > 0) {
            newValue.forEach((e) => {
                arr = [...arr, ...e?.categories];
                e?.categories.forEach((element) => {
                    arr2 = [...arr2, ...selectedCategories.filter((data) => data?.id === element?.id && data?.name === element?.name)];
                });
            });
            setSelectedCategories(arr2);
        } else {
            setSelectedCategories([]);
        }
        setCategories(arr.sort((a, b) => a.name.trim().localeCompare(b.name.trim())));
        setValue(newValue);
    };

    const handleCategoryChange = (event, newValue) => {
        setSelectedCategories(newValue);
    };

    const isOptionEqualToValue = (option, value) => {
        return option.id === value.id && option.name === value.name;
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
                <Grid item xs={12} md={6} style={{ height: height - 65 }}>
                    <img style={{ objectFit: 'contain', width: '100%', height: height - 65 }} src={img} alt="ico"></img>
                </Grid>
                <Grid item xs={12} md={6} style={{ backgroundColor: 'white', height: height - 65 }}>
                    <div style={{ dimensions: '100%', padding: '5% 10%', textAlign: 'start' }}>
                        <Typography sx={{ color: colors.primary, fontWeight: 'bold', padding: '20px' }} component="div" varient="h1">
                            Choose Scraps
                        </Typography>
                        <Box style={{ maxHeight: matches ? '100%' : height - 300, overflow: 'auto', padding: '10px' }}>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={products.sort((a, b) => a.name.trim().localeCompare(b.name.trim()))}
                                disableCloseOnSelect={true}
                                value={value}
                                isOptionEqualToValue={isOptionEqualToValue}
                                onChange={handleChange}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        <img
                                            loading="lazy"
                                            width="50"
                                            height="50"
                                            src={`https://www.shutterstock.com/image-photo/waste-plastic-bottles-other-types-260nw-426187984.jpg`}
                                            // srcSet={`https://flagcdn.com/w40/br.png 2x`}
                                            alt=""
                                        />
                                        {option.name}&nbsp;&nbsp;
                                        <Tooltip
                                            style={{ backgroundColor: 'white' }}
                                            placement="top"
                                            arrow
                                            key={option?.name}
                                            title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                        >
                                            <div>
                                                <InfoOutlinedIcon sx={{ fontSize: '20px' }} />
                                            </div>
                                        </Tooltip>
                                    </Box>
                                )}
                                getOptionLabel={(option) => option.name}
                                defaultValue={[products[0]]}
                                filterSelectedOptions={true}
                                renderInput={(params) => <TextField {...params} label="Choose your fav products" placeholder="Favorites" />}
                            />
                            <br></br>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={categories.sort((a, b) => a.name.trim().localeCompare(b.name.trim()))}
                                value={selectedCategories}
                                disableCloseOnSelect={true}
                                onChange={handleCategoryChange}
                                isOptionEqualToValue={isOptionEqualToValue}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        <img
                                            loading="lazy"
                                            width="50"
                                            height="50"
                                            src={`https://www.shutterstock.com/image-photo/waste-plastic-bottles-other-types-260nw-426187984.jpg`}
                                            // srcSet={`https://flagcdn.com/w40/br.png 2x`}
                                            alt=""
                                        />
                                        {option.name}&nbsp;&nbsp;
                                        <Tooltip
                                            sx={{ bgcolor: 'white' }}
                                            placement="top"
                                            arrow
                                            key={option?.name}
                                            title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                        >
                                            <div>
                                                <InfoOutlinedIcon sx={{ fontSize: '20px' }} />
                                            </div>
                                        </Tooltip>
                                    </Box>
                                )}
                                getOptionLabel={(option) => option.name}
                                // defaultValue={[categories[0]]}
                                filterSelectedOptions
                                renderInput={(params) => <TextField {...params} label="Choose your fav products" placeholder="Favorites" />}
                            />
                        </Box>
                        <div style={{ paddingTop: '20px' }}>
                            <button style={{ width: '150px', borderRadius: '30px' }} className="btn1">
                                Submit
                            </button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
}

export default StockPage;
