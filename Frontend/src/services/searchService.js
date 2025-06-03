import { materialAPI, jobAPI, machineAPI } from './api';

export const searchService = {
  // Global search function that searches across all content types
  globalSearch: async (searchTerm) => {
    try {
      // Run all searches in parallel
      const [materials, jobs, machines] = await Promise.all([
        materialAPI.getAllMaterials({ search: searchTerm }),
        jobAPI.getAllJobs({ keyword: searchTerm }),
        machineAPI.getAllMachines({ search: searchTerm })
      ]);

      return {
        materials: materials?.data || [],
        jobs: jobs?.data || [],
        machines: machines || []
      };
    } catch (error) {
      console.error('Global search error:', error);
      throw error;
    }
  },

  // Category-specific search functions
  searchMaterials: async (searchTerm) => {
    try {
      const response = await materialAPI.getAllMaterials({ search: searchTerm });
      return response?.data || [];
    } catch (error) {
      console.error('Material search error:', error);
      throw error;
    }
  },

  searchJobs: async (searchTerm) => {
    try {
      const response = await jobAPI.getAllJobs({ keyword: searchTerm });
      return response?.data || [];
    } catch (error) {
      console.error('Jobs search error:', error);
      throw error;
    }
  },

  searchMachines: async (searchTerm) => {
    try {
      const response = await machineAPI.getAllMachines({ search: searchTerm });
      return response || [];
    } catch (error) {
      console.error('Machines search error:', error);
      throw error;
    }
  }
}; 