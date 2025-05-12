import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

// Define interfaces for our data types
interface DataItem {
  name: string;
  count: number;
}

interface RatingItem {
  category: string;
  value: number;
}

interface RatingDistItem {
  rating: number;
  count: number;
}

// BMW Brand Colors
const BMW_COLORS = {
  darkBlue: "#1C69D4",
  midBlue: "#6295D8",
  grey: "#8E8E8E",
  lightGrey: "#F6F6F6",
  darkGrey: "#444444",
  // Rating colors (light shades)
  lightRed: "#FF9999",
  lightAmber: "#FFCC99",
  lightGreen: "#A3C9A8",
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "content" | "ratings"
  >("overview");

  // Data for charts
  const salesActivities: DataItem[] = [
    { name: "Getting them into the showroom", count: 10 },
    { name: "Following up after initial contact", count: 8 },
    { name: "Booking test rides", count: 8 },
    { name: "Getting attention with marketing", count: 4 },
    { name: "Explaining new model features", count: 3 },
  ];

  const contentTypes: DataItem[] = [
    { name: "Video walkarounds", count: 10 },
    { name: "Short social video clips", count: 8 },
    { name: "Pre-written email templates", count: 7 },
    { name: "Social posts", count: 7 },
    { name: "Other", count: 6 },
    { name: "Posters/POS materials", count: 5 },
    { name: "Landing page templates", count: 3 },
    { name: "Event invite templates", count: 3 },
  ];

  const communicationChannels: DataItem[] = [
    { name: "Email", count: 15 },
    { name: "Phone", count: 15 },
    { name: "Events", count: 12 },
    { name: "Facebook", count: 11 },
    { name: "Instagram", count: 8 },
    { name: "In-store/POS", count: 8 },
    { name: "Other", count: 4 },
    { name: "WhatsApp", count: 3 },
  ];

  const marketingTypes: DataItem[] = [
    { name: "Mostly organic", count: 9 },
    { name: "A balanced mix", count: 9 },
    { name: "Mostly paid", count: 3 },
  ];

  const contentIssues: DataItem[] = [
    { name: "Too much editing needed", count: 10 },
    { name: "Doesn't reflect how we sell locally", count: 7 },
    { name: "Not relevant to local audience", count: 6 },
    { name: "Other issues", count: 5 },
    { name: "Wrong format", count: 5 },
    { name: "Needs translation", count: 1 },
  ];

  const contentCreationTeams: DataItem[] = [
    { name: "In-house team", count: 16 },
    { name: "Both internal/external", count: 2 },
    { name: "Other", count: 3 },
  ];

  const ratings: RatingItem[] = [
    { category: "Quality of materials", value: 3.4 },
    { category: "Quantity of materials", value: 2.4 },
    { category: "Relevance of materials", value: 3.5 },
    { category: "Local adaptability", value: 2.4 },
    { category: "Usefulness of templates", value: 3.9 },
    { category: "Ease of use", value: 4.5 },
    { category: "Overall satisfaction", value: 4.7 },
  ];

  const ratingsByValue: Record<string, number[]> = {
    "Quality of materials": [1, 1, 8, 7, 2, 0],
    "Quantity of materials": [6, 5, 4, 2, 2, 0],
    "Relevance of materials": [2, 3, 3, 6, 5, 0],
    "Local adaptability": [7, 2, 2, 0, 1, 2],
    "Usefulness of templates": [1, 3, 4, 1, 4, 4],
    "Ease of use": [0, 0, 4, 5, 6, 4],
    "Overall satisfaction": [0, 0, 3, 5, 6, 5],
  };

  // Prepare rating distribution data for visualization
  const prepareRatingDistribution = (category: string): RatingDistItem[] => {
    const values = ratingsByValue[category];
    return [1, 2, 3, 4, 5, 6].map((rating, index) => ({
      rating,
      count: values[index],
    }));
  };

  // Colors for charts - using BMW color scheme
  const CHART_COLORS = [
    BMW_COLORS.darkBlue,
    BMW_COLORS.midBlue,
    BMW_COLORS.grey,
    BMW_COLORS.darkGrey,
    "#0077B6", // Additional blues that complement BMW colors
    "#90E0EF",
    "#023E8A",
    "#ADE8F4",
  ];

  // Custom tooltips
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-md">
          <p className="font-semibold">{label}</p>
          <p className="text-sm">{`Count: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const RatingsTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-md">
          <p className="font-semibold">{payload[0].payload.category}</p>
          <p className="text-sm">{`Score: ${payload[0].value} / 6`}</p>
        </div>
      );
    }
    return null;
  };

  const LegendFormatter = (value: string, entry: any) => {
    return <span className="text-sm">{value}</span>;
  };

  // Interactive chart for ratings
  const [selectedRating, setSelectedRating] = useState<string>(
    "Overall satisfaction"
  );

  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <div
        style={{ backgroundColor: BMW_COLORS.lightGrey }}
        className="p-4 rounded-t-lg shadow"
      >
        <div className="flex items-center mb-3">
          <img
            src="/images/logo.png"
            alt="BMW Motorrad Logo"
            className="h-12 mr-4"
          />
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: BMW_COLORS.darkGrey }}
            >
              Marketing Materials & Activities Dashboard
            </h1>
            <p style={{ color: BMW_COLORS.grey }}>
              Analysis of 22 survey responses from dealership partners
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("overview")}
          className={`py-2 px-4 font-medium ${
            activeTab === "overview"
              ? "text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          style={{
            backgroundColor:
              activeTab === "overview" ? BMW_COLORS.darkBlue : "transparent",
            color: activeTab === "overview" ? "white" : BMW_COLORS.darkGrey,
          }}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("content")}
          className={`py-2 px-4 font-medium ${
            activeTab === "content"
              ? "text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          style={{
            backgroundColor:
              activeTab === "content" ? BMW_COLORS.darkBlue : "transparent",
            color: activeTab === "content" ? "white" : BMW_COLORS.darkGrey,
          }}
        >
          Content Analysis
        </button>
        <button
          onClick={() => setActiveTab("ratings")}
          className={`py-2 px-4 font-medium ${
            activeTab === "ratings"
              ? "text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          style={{
            backgroundColor:
              activeTab === "ratings" ? BMW_COLORS.darkBlue : "transparent",
            color: activeTab === "ratings" ? "white" : BMW_COLORS.darkGrey,
          }}
        >
          Ratings & Feedback
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="p-4 bg-white">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sales Activities */}
            <div className="bg-gray-50 p-4 rounded shadow">
              <h2
                className="text-lg font-bold mb-2"
                style={{ color: BMW_COLORS.darkBlue }}
              >
                Sales Activities
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesActivities}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={BMW_COLORS.lightGrey}
                    />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={180} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill={BMW_COLORS.darkBlue} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Communication Channels */}
            <div className="bg-gray-50 p-4 rounded shadow">
              <h2
                className="text-lg font-bold mb-2"
                style={{ color: BMW_COLORS.darkBlue }}
              >
                Communication Channels
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={communicationChannels}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={BMW_COLORS.lightGrey}
                    />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill={BMW_COLORS.midBlue} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Overall Ratings */}
            <div className="bg-gray-50 p-4 rounded shadow">
              <h2
                className="text-lg font-bold mb-2"
                style={{ color: BMW_COLORS.darkBlue }}
              >
                Overall Ratings (Scale 1-6)
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={ratings}
                  >
                    <PolarGrid stroke={BMW_COLORS.lightGrey} />
                    <PolarAngleAxis
                      dataKey="category"
                      tick={{ fontSize: 10 }}
                    />
                    <PolarRadiusAxis domain={[0, 6]} />
                    <Radar
                      name="Ratings"
                      dataKey="value"
                      stroke={BMW_COLORS.darkBlue}
                      fill={BMW_COLORS.darkBlue}
                      fillOpacity={0.6}
                    />
                    <Tooltip content={<RatingsTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Marketing Types */}
            <div className="bg-gray-50 p-4 rounded shadow">
              <h2
                className="text-lg font-bold mb-2"
                style={{ color: BMW_COLORS.darkBlue }}
              >
                Marketing Types
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketingTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill={BMW_COLORS.darkBlue}
                      dataKey="count"
                      nameKey="name"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {marketingTypes.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend formatter={LegendFormatter} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Content Analysis Tab */}
        {activeTab === "content" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Content Types */}
            <div className="bg-gray-50 p-4 rounded shadow">
              <h2
                className="text-lg font-bold mb-2"
                style={{ color: BMW_COLORS.darkBlue }}
              >
                Content Types Used
              </h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={contentTypes}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={BMW_COLORS.lightGrey}
                    />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={180} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill={BMW_COLORS.darkBlue} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Content Issues */}
            <div className="bg-gray-50 p-4 rounded shadow">
              <h2
                className="text-lg font-bold mb-2"
                style={{ color: BMW_COLORS.darkBlue }}
              >
                Content Issues Reported
              </h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={contentIssues}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={BMW_COLORS.lightGrey}
                    />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={180} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill={BMW_COLORS.midBlue} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Content Creation Teams */}
            <div className="bg-gray-50 p-4 rounded shadow">
              <h2
                className="text-lg font-bold mb-2"
                style={{ color: BMW_COLORS.darkBlue }}
              >
                Content Creation Teams
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentCreationTeams}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill={BMW_COLORS.darkBlue}
                      dataKey="count"
                      nameKey="name"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {contentCreationTeams.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend formatter={LegendFormatter} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-gray-50 p-4 rounded shadow">
              <h2
                className="text-lg font-bold mb-2"
                style={{ color: BMW_COLORS.darkBlue }}
              >
                Key Content Insights
              </h2>
              <div className="h-64 overflow-y-auto">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-semibold">Most used content:</span>{" "}
                    Video walkarounds (10), Short social videos (8), Email
                    templates (7)
                  </li>
                  <li>
                    <span className="font-semibold">Top issue:</span> Too much
                    editing needed (10 mentions)
                  </li>
                  <li>
                    <span className="font-semibold">
                      Local relevance concerns:
                    </span>{" "}
                    13 dealers mentioned content doesn't reflect local sales or
                    isn't relevant to local audience
                  </li>
                  <li>
                    <span className="font-semibold">AI imagery concerns:</span>{" "}
                    Multiple comments about AI-generated images being
                    unrealistic or poor quality
                  </li>
                  <li>
                    <span className="font-semibold">Format issues:</span>{" "}
                    Requests for varied formats (landscape vs portrait), more
                    accessible video content
                  </li>
                  <li>
                    <span className="font-semibold">Content creation:</span> 76%
                    of dealers create content in-house
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Ratings & Feedback Tab */}
        {activeTab === "ratings" && (
          <div className="grid grid-cols-1 gap-6">
            {/* Ratings Overview */}
            <div className="bg-gray-50 p-4 rounded shadow">
              <h2
                className="text-lg font-bold mb-2"
                style={{ color: BMW_COLORS.darkBlue }}
              >
                Ratings Summary (Scale 1-6)
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={ratings}
                    margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
                  >
                    <CartesianGrid stroke={BMW_COLORS.lightGrey} />
                    <XAxis
                      dataKey="category"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis domain={[0, 6]} />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      barSize={30}
                      fill={BMW_COLORS.darkBlue}
                    >
                      {ratings.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.value >= 4
                              ? BMW_COLORS.lightGreen
                              : entry.value >= 3
                              ? BMW_COLORS.lightAmber
                              : BMW_COLORS.lightRed
                          }
                        />
                      ))}
                    </Bar>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={BMW_COLORS.darkBlue}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rating Selector and Distribution */}
              <div className="bg-gray-50 p-4 rounded shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2
                    className="text-lg font-bold"
                    style={{ color: BMW_COLORS.darkBlue }}
                  >
                    Rating Distribution
                  </h2>
                  <select
                    className="border rounded p-1"
                    style={{ borderColor: BMW_COLORS.midBlue }}
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                  >
                    {ratings.map((r) => (
                      <option key={r.category} value={r.category}>
                        {r.category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={prepareRatingDistribution(selectedRating)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={BMW_COLORS.lightGrey}
                      />
                      <XAxis
                        dataKey="rating"
                        label={{
                          value: "Rating Value",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "Count",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Bar dataKey="count" fill={BMW_COLORS.darkBlue}>
                        {prepareRatingDistribution(selectedRating).map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                index < 2
                                  ? BMW_COLORS.lightRed
                                  : index < 4
                                  ? BMW_COLORS.lightAmber
                                  : BMW_COLORS.lightGreen
                              }
                            />
                          )
                        )}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Key Findings */}
              <div className="bg-gray-50 p-4 rounded shadow">
                <h2
                  className="text-lg font-bold mb-2"
                  style={{ color: BMW_COLORS.darkBlue }}
                >
                  Key Findings
                </h2>
                <div className="h-64 overflow-y-auto">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-semibold">Strengths:</span> Overall
                      satisfaction (4.7/6) and ease of use (4.5/6) are rated
                      highest
                    </li>
                    <li>
                      <span className="font-semibold">
                        Areas for improvement:
                      </span>{" "}
                      Quantity of materials (2.4/6) and local adaptability
                      (2.4/6) scored lowest
                    </li>
                    <li>
                      <span className="font-semibold">Local adaptability:</span>{" "}
                      50% of respondents gave this a rating of 1/6
                    </li>
                    <li>
                      <span className="font-semibold">Quantity concerns:</span>{" "}
                      58% of respondents rated quantity of materials as 1-2 out
                      of 6
                    </li>
                    <li>
                      <span className="font-semibold">Mixed relevance:</span>{" "}
                      While relevance averages 3.5/6, responses are polarized
                      with 26% giving low scores (1-2) and 58% giving high
                      scores (4-5)
                    </li>
                    <li>
                      <span className="font-semibold">
                        Template usefulness:
                      </span>{" "}
                      47% rated templates highly (5-6/6), but 24% gave low
                      ratings (1-2/6)
                    </li>
                    <li>
                      <span className="font-semibold">Common feedback:</span>{" "}
                      Requests for more video content, non-AI images, and
                      locally adaptable materials
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with recommendations */}
      <div
        className="mt-4 p-4 rounded-b-lg shadow"
        style={{ backgroundColor: BMW_COLORS.lightGrey }}
      >
        <h2
          className="text-lg font-bold mb-2"
          style={{ color: BMW_COLORS.darkBlue }}
        >
          Key Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded shadow">
            <h3
              className="font-semibold"
              style={{ color: BMW_COLORS.darkBlue }}
            >
              Content Creation
            </h3>
            <ul
              className="list-disc pl-5 text-sm mt-2"
              style={{ color: BMW_COLORS.darkGrey }}
            >
              <li>Increase quantity of available materials</li>
              <li>Provide more video content (most requested format)</li>
              <li>Limit use of AI-generated images or improve quality</li>
              <li>Create more varied formats (portrait/landscape options)</li>
            </ul>
          </div>

          <div className="bg-white p-3 rounded shadow">
            <h3
              className="font-semibold"
              style={{ color: BMW_COLORS.darkBlue }}
            >
              Local Relevance
            </h3>
            <ul
              className="list-disc pl-5 text-sm mt-2"
              style={{ color: BMW_COLORS.darkGrey }}
            >
              <li>Develop templates that allow for local customization</li>
              <li>Consider regional variations in marketing materials</li>
              <li>Provide editable templates that require less modification</li>
              <li>Create channel-specific content for different bike models</li>
            </ul>
          </div>

          <div className="bg-white p-3 rounded shadow">
            <h3
              className="font-semibold"
              style={{ color: BMW_COLORS.darkBlue }}
            >
              Distribution & Support
            </h3>
            <ul
              className="list-disc pl-5 text-sm mt-2"
              style={{ color: BMW_COLORS.darkGrey }}
            >
              <li>Streamline access to video content for local use</li>
              <li>Provide social media calendars and ready-to-use content</li>
              <li>Create pre-launch content packages with varied assets</li>
              <li>
                Support more translation options for international dealers
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
