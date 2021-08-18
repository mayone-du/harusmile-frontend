import { AppBar, Box, Tab, Tabs } from "@material-ui/core";
import type { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import type { GetPlanQuery } from "src/apollo/schema";
import { Review } from "src/components/reviews/Review";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

type TabPanelProps = {
  children?: React.ReactNode;
  index: any;
  value: any;
};

const TabPanel = (props: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={props.value !== props.index}
      id={`plan-tabpanel-${props.index}`}
      aria-labelledby={`plan-tab-${props.index}`}
      {...{ ...props }}
    >
      {props.value === props.index && <Box p={0}>{props.children}</Box>}
    </div>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  };
});

// プラン詳細のタブ
export const PlanTab: React.VFC<GetPlanQuery> = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className="p-0">
        <Tabs
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          aria-label="plan detail tabs"
          className="bg-gray-300 text-black"
        >
          <Tab className="w-1/2" label="プラン詳細" {...a11yProps(0)} />
          <Tab className="w-1/2" label="このプランについて" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* プランについて */}
        <div className="my-2 p-2 border">
          <h2 className="text-center text-lg py-2 font-bold">{props.plan?.title}</h2>
          {/* サムネイルが設定されどうかているか */}
          {props.plan?.planImage === "" ? (
            <div className="flex items-center justify-center w-full h-32 border">
              サムネイルが設定されていません。
            </div>
          ) : (
            <img
              src={`${MEDIAFILE_API_ENDPOINT}${props.plan?.planImage}`}
              className="block object-cover w-full h-32"
              alt="プランのサムネイル"
            />
          )}
          <p className="text-sm">{props.plan?.content}</p>
          <div>{props.plan?.price}円</div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <h3 className="bg-gray-200 my-2 p-2 dark:text-gray-600">この人について</h3>
          {/* 自己紹介など */}
          <p>自己紹介</p>
          <div>{props.plan?.planAuthor?.targetUser?.profileText}</div>
          {/* レビュー */}
          <ul>
            {props.plan?.planAuthor.provider.edges.map((review, index) => {
              return (
                <Review
                  key={index}
                  customerImagePath={review?.node?.customer.targetUser?.profileImage}
                  customerName={
                    review?.node?.customer.targetUser?.profileName
                      ? review.node.customer.targetUser.profileName
                      : ""
                  }
                  reviewText={review?.node?.reviewText ? review.node.reviewText : ""}
                  reviewStars={review?.node?.stars ? review.node.stars : 0}
                />
              );
            })}
          </ul>
        </div>
      </TabPanel>
    </div>
  );
};
